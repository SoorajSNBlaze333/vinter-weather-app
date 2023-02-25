import { Cloud } from "phosphor-react";
import LineChart from "./misc/LineChart";
import { useEffect, useState } from "react";
import dayjs from "../lib/day";
import { LOCATIONS } from "@/config/constants";

let graphData = [];

export default function Today({ data = {}, config }) {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (data) {
      setWeatherData(data);
      const temperature = [];
      Object.entries(data).slice(0, 7).forEach((date, index) => temperature.push({ x: index, y: date[1]["t_2m:C"] }));
      graphData = temperature;
    }
  }, [data]);

  const renderWeatherForDate = (weatherData, index) => {
    const location = LOCATIONS[LOCATIONS.findIndex(location => location.lat === config.coordinates[0] && location.lon === config.coordinates[1])];
    const date = dayjs(weatherData[0]).utcOffset(location.utcOffset, false).format("hh:mm a");
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

  return (
    <div className="weather-for-dates">
      <div className="weather-for-date-container-flex">
        <p>Forecast for the next {config.duration * 6} hours</p>
        <hr />
        {Boolean(graphData.length) && <LineChart data={graphData} />}
        <div className="weather-for-date-container">
          {Object.entries(weatherData).slice(0, 7).map(renderWeatherForDate)}
        </div>
      </div>
    </div>
  )
}