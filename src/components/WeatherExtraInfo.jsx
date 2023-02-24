import dayjs from "../lib/day";

export default function WeatherExtraInfo({ data }) {
  const renderExtrasForWeather = (data) => {
    const today = Object.values(data).slice(0, 1)[0];
    console.log(today)


    // const date = dayjs(weatherData[0]).format("hh:mm a");
    // const data = weatherData[1];
    // console.log(data);
    return (<div className="weather-extra-for-date">
      <div>
        <p>SUNRISE</p>
        <p>{today["sunrise:sql"]}</p>
      </div>
      <div>
        <p>SUNSET</p>
        <p>{today["sunrise:sql"]}</p>
      </div>
      <div>
        <p>UV INDEX</p>
        <p>{today["uv:idx"]}</p>
      </div>
    </div>)
  }


  return (
    <div className="weather-extra">
      <div className="weather-extra-container-flex">
        <p>Extra Information</p>
        <hr />
        <div className="weather-extra-container">
          {renderExtrasForWeather(data)}
        </div>
      </div>
    </div>
  )
}