import { useEffect, useState } from 'react';
import Forecast from './Forecast';
import Info from './Info';
import Today from './Today';

export default function Weather({ data, config }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (data) {
      setWeather(data.weatherData);
    }
  }, [data]);

  if (!weather) return <div>No data provided yet</div>

  return (<div className="weather-view-grid" style={{ 
    transition: "all",
    transitionDuration: "200ms",
    background: Object.values(weather)[0]["weather_symbol_1h:idx"] < 17 ? "linear-gradient(rgb(125 211 252), rgb(2 132 199))" : "linear-gradient(rgb(30 58 138), rgb(15 23 42))"
  }}>
    <Info data={weather} config={config} />
    <Today data={weather} config={config} />
    <Forecast data={weather} config={config} />
  </div>)
}