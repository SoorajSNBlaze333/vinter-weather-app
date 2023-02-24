import { useEffect, useState } from 'react';
import dayjs from '../lib/day';
import { Cloud } from 'phosphor-react';
import WeatherForecast from './WeatherForecast';

export default function WeatherAcrossDates({ data }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    setWeather(data ? data.weatherData : null);
  }, [data]);

  const renderWeatherForToday = () => {
    const date = dayjs().format("hh:mm a");
    const data = Object.values(weather)[0];
    console.log(data);
    return (<div className="weather-for-today-container">
      <p className="">{date}</p>
      <p className="">{`${data["t_2m:C"]}°C`}</p>
      <p className="">High: {`${data["t_max_2m_24h:C"]}°C`}</p>
      <p className="">Low: {`${data["t_min_2m_24h:C"]}°C`}</p>
      <p className="">{weather.location}</p>
    </div>)
  }

  const renderWeatherForDate = (weatherData, index) => {
    const date = dayjs(weatherData[0]).format("hh:mm a");
    const data = weatherData[1];
    return (<div key={index} className="weather-for-date">
      <p>{Boolean(!index) ? "Now" : date}</p>
      <Cloud size={20} />
      <span className="weather-for-date-temperature">
        <p>{data["t_2m:C"]}</p>
        <sup>°C</sup>
      </span>
    </div>)
  }

  if (!weather) return <div>No data provided yet</div>

  return (<div className="weather-view-grid">
    <div className="weather-for-today">
      {renderWeatherForToday()}
    </div>
    <div className="weather-for-dates">
      <div className="weather-for-date-container-flex">
        <p>Forecast for the next 6 hours</p>
        <hr />
        <div className="weather-for-date-container">
          {Object.entries(weather).slice(0, 7).map(renderWeatherForDate)}
        </div>
      </div>
    </div>
    <div className="weather-sunrise-sunset"></div>
    <WeatherForecast data={weather} />
  </div>)
}