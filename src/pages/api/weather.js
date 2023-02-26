import { METEOMATICS_WEATHER } from "@/config/routes";

export default async function handler(req, res) {
  const config = req.query;

  let BASE_URL = METEOMATICS_WEATHER;
  BASE_URL += config.datetime + "P" + config.timerange + "D:PT" + config.duration + "H/";
  BASE_URL += config.parameters + "/";
  BASE_URL += config.coordinates + "/";
  BASE_URL += `json?access_token=${config.token}`;

  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json()
    .then(({ data }) => {
      const processedData = { location: "", weatherData: {} };
      data.forEach(({ parameter, coordinates }) => {
        processedData.location = { lat: coordinates[0].lat, lon: coordinates[0].lon };
        const timestamps = coordinates[0].dates;
        timestamps.forEach((timestamp) => {
          processedData.weatherData[timestamp.date] = { ...processedData.weatherData[timestamp.date], [parameter]: timestamp.value }
        });
      });
      return res.status(200).json({ data: processedData })
    })
    .catch(error => {
      return res.status(500).json({ success: false, error })
    })
}
