import { Moon, Sun, SunHorizon, Waves } from "phosphor-react";
import dayjs from "../lib/day";

export default function WeatherToday({ location = "Houston", data, config }) {
  const renderWeatherForToday = (data) => {
    const date = dayjs().format("h:mm a");
    const weather = Object.values(data)[0];
    const today = Object.values(data).slice(0, 1)[0];

    return (<div className="weather-for-today-container">
      <div className="" style={{ margin: 0, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <p style={{ fontSize: "100px", margin: 0, marginRight: "20px", marginBottom: "10px" }}>{`${weather["t_2m:C"]}°C`}</p>
        {today["weather_symbol_1h:idx"] < 17 ? <Sun size={60} /> : <Moon size={60} />}
      </div>
      <p className="" style={{ fontSize: "50px", margin: 0, marginBottom: "10px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>{location}</p>
      <p className="" style={{ margin: 0, marginBottom: "10px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        {date} {(config.parameters.includes("t_max_2m_24h:C") && (weather["t_max_2m_24h:C"])) && `| High: ${weather["t_max_2m_24h:C"]}°C`} {(config.parameters.includes("t_min_2m_24h:C") && (weather["t_min_2m_24h:C"])) && `| Low: ${weather["t_min_2m_24h:C"]}°C`}
      </p>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end" }}>
        {config.parameters.includes("sunrise:sql") && <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <Sun size={32} weight="bold" style={{ marginRight: "10px", marginBottom: "5px" }} />
          <p style={{ margin: 0, marginRight: "5px" }}>Sunrise </p>
          <p style={{ margin: 0 }}>{today["sunrise:sql"]}</p>
        </div>}
        {config.parameters.includes("sunset:sql") && <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <SunHorizon size={32} weight="bold" style={{ marginRight: "10px", marginBottom: "5px" }} />
          <p style={{ margin: 0, marginRight: "5px" }}>Sunset </p>
          <p style={{ margin: 0 }}>{today["sunset:sql"]}</p>
        </div>}
        {config.parameters.includes("uv:idx") && <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <Waves size={32} weight="bold" style={{ marginRight: "10px" }} />
          <p style={{ margin: 0, marginRight: "5px" }}>UV Index </p>
          <p style={{ margin: 0 }}>{today["uv:idx"]}</p>
        </div>}
      </div>
    </div>)
  }

  return (<div className="weather-for-today">
    {renderWeatherForToday(data)}
  </div>)
}