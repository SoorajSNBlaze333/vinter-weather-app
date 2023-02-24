import { Cloud } from "phosphor-react";
import dayjs from "../lib/day";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FORECAST = [];

export default function WeatherToday({ data }) {
  const renderWeatherForToday = (data) => {
    const date = dayjs().format("h:mm a");
    const weather = Object.values(data)[0];
    console.log(data);
    return (<div className="weather-for-today-container">
      <div className="" style={{ margin: 0, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <p style={{ fontSize: "100px", margin: 0, marginRight: "20px", marginBottom: "10px" }}>{`${weather["t_2m:C"]}°C`}</p>
        <Cloud size={60} />
      </div>
      <p className="" style={{ fontSize: "50px", margin: 0, marginBottom: "10px" }}>Houston, Texas</p>
      <p className="" style={{ margin: 0 }}>
        {date} | High: {`${weather["t_max_2m_24h:C"]}°C`} | Low: {`${weather["t_min_2m_24h:C"]}°C`}
      </p>
    </div>)
  }

  return (<div className="weather-for-today">
    {renderWeatherForToday(data)}
  </div>)
}