import { useEffect, useState } from 'react';
import dayjs from '../lib/day';
import { Cloud } from 'phosphor-react';
import WeatherForecast from './WeatherForecast';
import WeatherExtraInfo from './WeatherExtraInfo';
import WeatherToday from './WeatherToday';
import LineChart from './LineChart';

let graphData = [];

export default function WeatherAcrossDates({ data, config }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    // setLocation(data ? data.location : { lat: 0, lon: 0 });
    if (data) {
      setWeather(data.weatherData);
      const temperature = [];
      Object.entries(data.weatherData).slice(0, 7).forEach((date, index) => temperature.push({ x: index, y: date[1]["t_2m:C"] }));
      graphData = temperature;
    }
  }, [data]);

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

  return (<div className="weather-view-grid" style={{ 
    transition: "all",
    transitionDuration: "200ms",
    background: Object.values(weather)[0]["weather_symbol_1h:idx"] > 17 ? "linear-gradient(rgb(125 211 252), rgb(2 132 199))" : "linear-gradient(rgb(30 58 138), rgb(15 23 42))"
  }}>
    <WeatherToday location={location} data={weather} config={config} />
    <div className="weather-for-dates">
      <div className="weather-for-date-container-flex">
        <p>Forecast for the next {config.duration * 6} hours</p>
        <hr />
        {Boolean(graphData.length) && <LineChart data={graphData} />}
        <div className="weather-for-date-container">
          {Object.entries(weather).slice(0, 7).map(renderWeatherForDate)}
        </div>
      </div>
    </div>
    <WeatherForecast data={weather} config={config} />
  </div>)
}