import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { checkAccessTokenValidity } from './auth';

dayjs.extend(utc);

export const fetchWeatherData = async() => {
  const startDate = dayjs().utc().format('YYYY-MM-DDThh:mm:ssZ');
  const endDate = dayjs().utc().add(2, 'days').format('YYYY-MM-DDThh:mm:ssZ');
  const token = await checkAccessTokenValidity();
  const URL = `https://api.meteomatics.com/${startDate}--${endDate}/t_2m:C,t_min_2m_24h:C,t_max_2m_24h:C,uv:idx,sunrise:sql,sunset:sql,weather_symbol_1h:idx/postal_US77058/json?access_token=${token}`;
  return axios.get(URL)
    .then(response => response.data.data)
    .then((data = []) => {
      const processedData = { location: "", weatherData: {} };
      data.forEach(({ parameter, coordinates }) => {
        if (!processedData.location.length) processedData.location = coordinates[0].station_id;
        const timestamps = coordinates[0].dates;
        timestamps.forEach((timestamp) => {
          processedData.weatherData[timestamp.date] = { ...processedData.weatherData[timestamp.date], [parameter]: (parameter === "sunrise:sql" || parameter === "sunset:sql") ? dayjs(timestamp.value).utcOffset(-6, true).format("hh:mm:ss") : timestamp.value }
        });
      });
      return processedData;
    })
    .catch(error => console.log(error))
}