import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const WeatherDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!country) return;
    
    weatherService.getWeatherInfo(country)
      .then(data => {
        const weatherIcon = data.weather[0].icon;
        setWeatherData({
          temp: data.main.temp ,
          windSpeed: data.wind.speed,
          weatherIconUrl: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
          weatherIconAlt: data.weather[0].description
        });
      })
      .catch(() => {
        setWeatherData(null);
      });
  }, [country]);

  return (
    <div>
      <h3>Weather in {country.capitals ? country.capitals[0] : country.name}</h3>
      { weatherData ? (<div>
        <p>temperature {weatherData.temp} Celcius</p>
        <img src={weatherData.weatherIconUrl} alt={weatherData.weatherIconAlt} />
        <p>wind {weatherData.windSpeed} m/s</p>
      </div>) : <h3>No weather data could be found</h3>
      }
    </div>)
}

export default WeatherDetails;