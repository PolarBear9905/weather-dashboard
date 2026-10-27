import './Dashboard.css' 
import Sunrise from '/sunrise.png'
import Sunset from '/sunset.png'
import Searchbar from './components/Searchbar'

const Dashboard = ({ data, location, setLocation, searchLocation, forecast}) => {
  const formatDay = (timestamp) => {
    const options = { weekday: "short" }
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString("en-US", options)
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString("en-US", {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }   

  return (
    <div>
      <Searchbar
        location={location}
        setLocation={setLocation}
        searchLocation={searchLocation}
      />
      {data.sys && data.main && (
        <div className='info-container'>
          <div className='grid'>
            <div className='big-card'>
            <p>{data.name}, {data.sys.country}</p>
            <h1>{Math.round(data.main.temp - 273.15)}°C</h1>
            <p>Feels like: {Math.round(data.main.feels_like - 273.15)} °C</p>
            </div>
          
            <div className='big-card'>
            <p>{data.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description}/>
            </div>

            <div className='small-cards-col'>
              <div className="small-card-col">
                <p>Humidity</p>
                <h3>{data.main.humidity}%</h3>
              </div>

              <div className="small-card-col">
                <p>Wind Speed</p>
                <h3>{Math.round(data.wind.speed * 3.6)} km/h</h3>
              </div>

              <div className="small-card-col">
                <p>Pressure</p>
                <h3>{data.main.pressure} hPa</h3>
              </div>

              <div className="small-card-col">
                <p>Visibility</p>
                <h3>{data.visibility / 1000} km</h3>
              </div>
            </div>

            <div className='small-cards-row'>
              <div className="small-card-row">
                <img className='small-card-img' src={Sunrise} alt='sunrise'></img>
                <p>Sunrise</p>
                <h3>{formatTime(data.sys.sunrise)}</h3>
              </div>

              <div className="small-card-row">
                <img className='small-card-img' src={Sunset} alt='sunset'></img>
                <p>Sunset</p>
                <h3>{formatTime(data.sys.sunset)}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-card">
            {forecast
              .filter((item) => item.dt_txt.includes("12:00:00"))
              .slice(0, 5).map((day) => (
              <div className='day' key={day.dt}>
                <p className='day-name'>{formatDay(day.dt)}</p>
                <img
                  className='day-icon'
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <h3>
                  {Math.round(day.main.temp - 273.15)}°C
                </h3>
              </div>         
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
