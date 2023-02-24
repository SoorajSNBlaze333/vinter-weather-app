import axios from 'axios';
import { checkAccessTokenValidity } from './auth';
import dayjs from '../lib/day';

export const fetchWeatherData = async() => {
  const startDate = dayjs().utcOffset(-6, true).format(`YYYY-MM-DDThh:mm:ssZ`);
  const token = await checkAccessTokenValidity();
  const URL = `https://api.meteomatics.com/${startDate}P5D:PT1H/t_2m:C,t_min_2m_24h:C,t_max_2m_24h:C,uv:idx,sunrise:sql,sunset:sql,weather_symbol_1h:idx/29.7604,95.3698/json?access_token=${token}`;
  return axios.get(URL)
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