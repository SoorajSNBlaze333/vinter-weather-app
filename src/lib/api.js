import { checkAccessTokenValidity } from './auth';

export const fetchWeatherData = async(config) => {
  let BASE_URL = "https://api.meteomatics.com/";
  BASE_URL += config.datetime + "P" + config.timerange + "D:PT" + config.duration + "H/";
  BASE_URL += config.parameters.join(',') + "/";
  BASE_URL += config.coordinates.join(',') + "/";
  const token = await checkAccessTokenValidity();
  BASE_URL += `json?access_token=${token}`;

  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "cors"
  });
  const result = response.json()

  return result
    .then(({ data }) => {
      const processedData = { location: "", weatherData: {} };
      data.forEach(({ parameter, coordinates }) => {
        processedData.location = { lat: coordinates[0].lat, lon: coordinates[0].lon };
        const timestamps = coordinates[0].dates;
        timestamps.forEach((timestamp) => {
          processedData.weatherData[timestamp.date] = { ...processedData.weatherData[timestamp.date], [parameter]: timestamp.value }
        });
      });
      return processedData;
    })
    .catch(error => console.log(error))
}