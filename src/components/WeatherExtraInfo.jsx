export default function WeatherExtraInfo({ data, config }) {
  const renderExtrasForWeather = (data) => {
    const today = Object.values(data).slice(0, 1)[0];
    return (<div className="weather-extra-for-date">
      {config.parameters.includes("sunrise:sql") && <div>
        <p>SUNRISE</p>
        <p>{today["sunrise:sql"]}</p>
      </div>}
      {config.parameters.includes("sunset:sql") && <div>
        <p>SUNSET</p>
        <p>{today["sunset:sql"]}</p>
      </div>}
      {config.parameters.includes("uv:idx") && <div>
        <p>UV INDEX</p>
        <p>{today["uv:idx"]}</p>
      </div>}
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