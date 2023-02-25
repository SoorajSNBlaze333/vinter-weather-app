import axios from 'axios';
import { checkAccessTokenValidity } from './auth';
import dayjs from '../lib/day';

export const fetchWeatherData = async(config) => {
  let BASE_URL = "https://api.meteomatics.com/";
  BASE_URL += config.datetime + "P" + config.timerange + "D:PT" + config.duration + "H/";
  BASE_URL += config.parameters.join(',') + "/";
  BASE_URL += config.coordinates.join(',') + "/";
  const token = await checkAccessTokenValidity();
  BASE_URL += `json?access_token=${token}`;

  return axios.get(BASE_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false,
  })
    .then(response => response.data.data)
    .then((data = []) => {
      const processedData = { location: "", weatherData: {} };
      data.forEach(({ parameter, coordinates }) => {
        processedData.location = { lat: coordinates[0].lat, lon: coordinates[0].lon };
        const timestamps = coordinates[0].dates;
        timestamps.forEach((timestamp) => {
          processedData.weatherData[timestamp.date] = { ...processedData.weatherData[timestamp.date], [parameter]: (parameter === "sunrise:sql" || parameter === "sunset:sql") ? dayjs(timestamp.value).utcOffset(-6, true).format("h:mm A") : timestamp.value }
        });
      });
      return processedData;
    })
    .catch(error => console.log(error))
}