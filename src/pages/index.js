import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { fetchWeatherData } from '@/lib/api'
import WeatherAcrossDates from '@/components/WeatherAcrossDates'
import dayjs from '../lib/day';
import { PencilSimple } from 'phosphor-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherConfig, setWeatherConfig] = useState({
    datetime: `${dayjs().utcOffset(-6, true).format(`YYYY-MM-DDThh:mm:ssZ`)}`,
    timerange: 2,
    duration: 2,
    coordinates: [29.749907, -95.358421],
    parameters: ["t_2m:C", "t_min_2m_24h:C", "t_max_2m_24h:C", "uv:idx", "sunrise:sql", "sunset:sql", "weather_symbol_1h:idx"]
  });
  const [configView, toggleConfigView] = useState(false);

  useEffect(() => {
    handleFetch(weatherConfig);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFetch = async() => {
    setIsFetching(true);
    return fetchWeatherData(weatherConfig)
      .then(data => setWeatherData(data))
      .catch(error => console.log(error))
      .finally(() => setIsFetching(false))
  }

  const handleInputCheckbox = (e) => {
    setWeatherConfig(config => {
      const index = config.parameters.findIndex(param => param === e.target.name);
      let newParams = [ ...config.parameters ];
      if (index < 0) newParams.push(e.target.name);
      else newParams = newParams.filter(param => param !== e.target.name)
      return {
        ...config,
        parameters: [ ...newParams ]
      }
    })
  }

  const handleDuration = (e) => {
    setWeatherConfig(config => {
      return {
        ...config,
        duration: e.target.value
      }
    })
  }

  const handleTimerange = (e) => {
    setWeatherConfig(config => {
      return {
        ...config,
        timerange: e.target.value
      }
    })
  }

  const renderWeatherData = () => {
    return (<div className=''>
      {isFetching ? <div>Loading Data</div> : <WeatherAcrossDates data={weatherData} config={weatherConfig} />}
      
      <button onClick={() => toggleConfigView(true)} className="fetch-button">
        <PencilSimple size={24} />
      </button>

      <div className='weather-fetch-config' style={{ right: configView ? "0px" : "-400px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "20px" }}>
          {/* <label htmlFor='location-parameter'>Location</label>
          <select id="location-parameter" onChange={handleTimerange} defaultValue={weatherConfig.timerange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select> */}

          <label htmlFor='timerange-parameter'>Timerange</label>
          <select id="timerange-parameter" onChange={handleTimerange} defaultValue={weatherConfig.timerange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>

          <label htmlFor='duration-parameter'>Duration</label>
          <select id="duration-parameter" onChange={handleDuration} defaultValue={weatherConfig.duration}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>

          <input id="temperature-min-parameter" name="t_min_2m_24h:C" onChange={handleInputCheckbox} type="checkbox" checked={weatherConfig.parameters.includes("t_min_2m_24h:C")} />
          <label htmlFor='temperature-min-parameter'>Min Temperature</label>

          <input id="temperature-max-parameter" name="t_max_2m_24h:C" onChange={handleInputCheckbox} type="checkbox" checked={weatherConfig.parameters.includes("t_max_2m_24h:C")} />
          <label htmlFor='temperature-max-parameter'>Max Temperature</label>

          <input id="uv-index-parameter" name="uv:idx" onChange={handleInputCheckbox} type="checkbox" checked={weatherConfig.parameters.includes("uv:idx")} />
          <label htmlFor='uv-index-parameter'>UV Index</label>

          <input id="sunrise-parameter" name="sunrise:sql" onChange={handleInputCheckbox} type="checkbox" checked={weatherConfig.parameters.includes("sunrise:sql")} />
          <label htmlFor='sunrise-parameter'>Sunrise Time</label>

          <input id="sunset-parameter" name="sunset:sql" onChange={handleInputCheckbox} type="checkbox" checked={weatherConfig.parameters.includes("sunset:sql")} />
          <label htmlFor='sunset-parameter'>Sunset Time</label>
        </div>

        <button onClick={handleFetch}>Show weather</button>
        <button onClick={() => toggleConfigView(false)}>Close</button>
      </div>
    </div>)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} weather-main`}>
        {renderWeatherData()}
      </main>
    </>
  )
}
