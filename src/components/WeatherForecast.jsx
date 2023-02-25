import { useEffect, useState } from "react";
import dayjs from "../lib/day";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeatherForecast({ data, config }) {
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    setForecast(() => {
      const newForecast = {}
      Object.entries(data).forEach((timestamp) => {
        const date = dayjs(timestamp[0]).format("YYYY-MM-DD");
        newForecast[date] = { 
          min: timestamp[1]["t_min_2m_24h:C"],
          max: timestamp[1]["t_max_2m_24h:C"],
          avg: timestamp[1]["t_2m:C"]
        };
      });
      return newForecast;
    });
  }, [data]);

  const renderWeatherForDate = (forecastData, index) => {
    const date = DAYS[dayjs(forecastData[0]).day()];
    const data = forecastData[1];
    return (<div key={index} className="weather-forecast-for-date">
      <p>{Boolean(!index) ? "Today" : date}</p>
      <span className="weather-forecast-for-date-temperature">
        {data.avg}°C
      </span>
      <div className="weather-forecast-for-date-min-max">
        <div>{data.min}°C</div>
        <div className="progress-bar" style={{ width: "100%", height: "5px", borderRadius: "2.5px", marginLeft: "10px", marginRight: "10px", position: "relative" }}>
          <div style={{ position: "absolute", height: "8px", width: "8px", background: "#fff", borderRadius: "8px", bottom: "-1.5px", boxShadow: "0px 0px 5px white", left: (((data.avg - data.min) * 100)/(data.max - data.min)) + "%"  }}></div>
        </div>
        <div>{data.max}°C</div>
      </div>
    </div>)
  }

  return (<div className="weather-forecast">
    <div className="weather-forecast-container-flex">
      <p>Forecast for the next {config.timerange + 1} days</p>
      <hr />
      <div className="weather-forecast-container">
        {Object.entries(forecast).map(renderWeatherForDate)}
      </div>
    </div>
  </div>)
}