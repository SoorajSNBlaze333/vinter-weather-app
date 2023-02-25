import { Sun, SunHorizon, Waves } from "phosphor-react";
import { LOCATIONS } from "@/config/constants";
import dayjs from "../lib/day";

export default function Info({ data, config }) {
  const renderWeatherForToday = (data) => {
    const weather = Object.values(data)[0];
    const today = Object.values(data).slice(0, 1)[0];

    const renderLocation = () => {
      const index = LOCATIONS.findIndex((location) => (location.lat === config.coordinates[0] && location.lon === config.coordinates[1]));
      return LOCATIONS[index];
    }

    return (<div className="weather-for-today-container">
      <div className="" style={{ margin: 0, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <p style={{ fontSize: "100px", margin: 0, marginRight: "20px", marginBottom: "10px" }}>{`${weather["t_2m:C"]}°C`}</p>
      </div>
      <p className="" style={{ fontSize: "50px", margin: 0, marginBottom: "10px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>{renderLocation().name}</p>
      <p className="" style={{ margin: 0, marginBottom: "10px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        {renderLocation().time} {(config.parameters.includes("t_max_2m_24h:C") && (weather["t_max_2m_24h:C"])) && `| High: ${weather["t_max_2m_24h:C"]}°C`} {(config.parameters.includes("t_min_2m_24h:C") && (weather["t_min_2m_24h:C"])) && `| Low: ${weather["t_min_2m_24h:C"]}°C`}
      </p>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end" }}>
        {config.parameters.includes("sunrise:sql") && <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <Sun size={32} weight="bold" style={{ marginRight: "10px", marginBottom: "10px" }} />
          <p style={{ margin: 0, marginRight: "5px" }}>Sunrise </p>
          <p style={{ margin: 0 }}>{dayjs(today["sunrise:sql"]).utcOffset(renderLocation().utcOffset, false).format("h:mm a")}</p>
        </div>}
        {config.parameters.includes("sunset:sql") && <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <SunHorizon size={32} weight="bold" style={{ marginRight: "10px", marginBottom: "10px" }} />
          <p style={{ margin: 0, marginRight: "5px" }}>Sunset </p>
          <p style={{ margin: 0 }}>{dayjs(today["sunset:sql"]).utcOffset(renderLocation().utcOffset, false).format("h:mm a")}</p>
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