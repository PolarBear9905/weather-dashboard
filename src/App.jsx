import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Dashboard from "./Dashboard";
import LoadingPage from './components/LoadingPage';

const App = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false);

  const locationRequested = useRef(false) /*show alert once*/
  useEffect(() => {
    if (locationRequested.current) return;

    locationRequested.current = true
    findLocation();
  }, [])

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchForecast = async(latitude, longitude) => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

    const response = await axios.get(forecastURL)
    setForecast(response.data.list)
  }
  
  const searchLocation = async() => {
    if (!location) return;
    
    try {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`

      const response = await axios.get(weatherURL)
      setData(response.data)
      
      const { lat, lon } = response.data.coord
      await fetchForecast(lat,lon)
    } catch (error) {
      console.error('Error fetching weather:', error)
      alert('Unable to find weather for this location.')
    } finally {
      setLocation('')
    }
  }

  const findLocation = () => {
    if (!navigator.geolocation) {
      alert('Location is not supported by your browser. Please search for a city manually.');
      return;
    }

    alert('Requesting location access...')
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try{          
          const {latitude, longitude } = position.coords;

          const weatherURL = `https://api.openweathermap.org/data/2.5/weather` +
          `?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

          const response = await axios.get(weatherURL)
          setData(response.data)
          
          await fetchForecast(latitude,longitude)

          alert(
            `Location access granted! Showing weather for ${response.data.name}.`
          )
        }
        catch(error) {
          console.error('Error finding location weather:', error)
          alert(
            'Could not fetch your local weather. Please try searching for a city.'
          )
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        setLoading(false)
        if (error.code === error.PERMISSION_DENIED){
          alert(
            'Location access was denied. You can still search for a city manually.'
          )
        } else {
          alert(
            'Unable to detect your location. Please search for a city manually.'
          )
        }
      }
    );  
  };
  
  return (
      <div>
        {loading ? (
            <LoadingPage />
          ) : (
            <Dashboard
              data={data}
              location={location}
              setLocation={setLocation}
              searchLocation={searchLocation}
              forecast={forecast}
            />
          )}
      </div>
  );
}

export default App
