import dayjs from "../lib/day";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FORECAST = [];

export default function WeatherForecast({ data }) {
  const renderWeatherForDate = (weatherData, index) => {
    const date = DAYS[dayjs(weatherData[0]).day()];
    const data = weatherData[1];
    return (<div key={index} className="weather-forecast-for-date">
      <p>{Boolean(!index) ? "Today" : date}</p>
      <span className="weather-forecast-for-date-temperature">
        <p>{data["t_2m:C"]}</p>
        <sup>°C</sup>
      </span>
      <div className="weather-forecast-for-date-min-max">Min Max</div>
    </div>)
  }

  return (<div className="weather-forecast">
    <div className="weather-forecast-container-flex">
      <p>Forecast for the next 5 days</p>
      <hr />
      <div className="weather-forecast-container">
        {Object.entries(data).slice(0, 5).map(renderWeatherForDate)}
      </div>
    </div>
  </div>)
}