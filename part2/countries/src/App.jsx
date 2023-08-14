import { useEffect, useState } from 'react'
import countryService from './services/countries';

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
    if (!searchWord || searchWord == '') {
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
            capitals: country.capital,
            area: country.area,
            languages: country.languages,
            flags: country.flags
          }));
        setCountries([...matchedCountries]);
      })
      .catch(err => console.log(err));
    
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
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return <div>
    {countries.map((country) => <p key={country.area}>{country.name}  <button onClick={() => handleSelection(country.name)}>show</button></p>)}
  </div>
}

const CountryDetails = ({ country }) => {
  if (!country) {
    return null;
  }

  return (<div>
    <h2>{country.name}</h2>
    <p>capital: {country.capitals.join(', ')}</p>
    <p>area: {country.area}</p>
    <h3>languages:</h3>
    <ul>
      { Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>) }
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>
  </div>)
}

export default App
