import { useEffect, useState } from 'react';
import dayjs from '../lib/day';
// import WeatherSymbol from './WeatherSymbol';

export default function WeatherAcrossDates({ data }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    setWeather(data ? data.weatherData : null);
  }, [data]);

  const renderWeatherForToday = () => {
    const date = dayjs().format("hh:mm a");
    const data = Object.values(weather)[0];
    console.log(data);
    return (<div>
      <p>{date}</p>
      {/* <WeatherSymbol weatherSymbol={data["weather_symbol_1h:idx"]} /> */}
      <p>{`${data["t_2m:C"]}°C`}</p>
      <p>{data.location}</p>
    </div>)
  }

  const renderWeatherForDate = (weatherData, index) => {
    const date = dayjs(weatherData[0]).format("hh:mm a");
    const data = weatherData[1];
    return (<div key={index} className="weather-for-date">
      <p>{Boolean(!index) ? "Now" : date}</p>
      {/* <WeatherSymbol weatherSymbol={data["weather_symbol_1h:idx"]} /> */}
      <p>{`${data["t_2m:C"]}°C`}</p>
    </div>)
  }

  if (!weather) return <div>No data provided yet</div>

  return (<div className="weather-view-grid">
    <div className="weather-for-today">
      {renderWeatherForToday()}
    </div>
    <div className="weather-for-dates">
      {Object.entries(weather).map(renderWeatherForDate)}
    </div>
    <div className="weather-sunrise-sunset"></div>
    <div className="weather-forecast"></div>
  </div>)
}