import { useEffect, useState } from 'react'
import countryService from './services/countries';
import weatherService from './services/weather';

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [countries, setCountries] = useState(null);

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  }

  const changeSearchWord = (word) => {
    setSearchWord(word);
  }

  useEffect(() => {
    if (!searchWord || searchWord === '') {
      setCountries([]);
      return;
    }

    countryService
      .getAll()
      .then(data => {
        const matchedCountries = data
          .filter(country => country.name.common
            .toLowerCase()
            .includes(searchWord.toLowerCase()))
          .map(country => ({
            name: country.name.common,
            code: country.cca2,
            capitals: country.capital,
            area: country.area,
            languages: country.languages,
            flags: country.flags,
            capitalGeo: {
              lat: country.capitalInfo.latlng?.[0],
              lon: country.capitalInfo.latlng?.[1],
            }
          }));
        setCountries([...matchedCountries]);
      })
      .catch();
    
  }, [searchWord]);
  return (
    <div>
      <p>find countries <input type='text' value={searchWord} onChange={handleInputChange} /></p>
      { countries && 
        (countries.length === 1  ? 
          <CountryDetails country={countries[0]} /> : 
          <CountryList countries={countries} handleSelection={changeSearchWord}/>) 
      }
    </div>
  )
}

const CountryList = ({ countries, handleSelection }) => {
  console.log(countries, 'in CountryList');
  console.log(countries.filter(c => !c.capitalGeo.lat), 'in CountryList');

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return <div>
    {countries.map((country) => <p key={country.area}>{country.name}  <button onClick={() => handleSelection(country.name)}>show</button></p>)}
  </div>
}

const CountryDetails = ({ country }) => {
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

  return (<div>
    <h2>{country.name}</h2>
    <p>capital: {country.capitals ? country.capitals.join(', ') : 'no info'}</p>
    <p>area: {country.area}</p>
    <h3>languages:</h3>
    <ul>
      { Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>) }
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>
    <h3>Weather in {country.capitals ? country.capitals[0] : country.name}</h3>
    { weatherData ? (<div>
      <p>temperature {weatherData.temp} Celcius</p>
      <img src={weatherData.weatherIconUrl} alt={weatherData.weatherIconAlt} />
      <p>wind {weatherData.windSpeed} m/s</p>
    </div>) : <h3>No weather data could be found</h3>
    }

  </div>)
}

export default App
