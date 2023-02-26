import { checkAccessTokenValidity } from './auth';

export const fetchWeatherData = async(config) => {
  const token = await checkAccessTokenValidity();
  const newConfig = { ...config, token };
  const parameters = new URLSearchParams(newConfig).toString()
  const response = await fetch(`https://main.d1euh075gobjok.amplifyapp.com/api/weather?${parameters}`, { method: 'GET' });
  return response.json()
    .then(({ data }) => data)
    .catch(error => console.log(error))
}