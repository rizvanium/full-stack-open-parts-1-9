import { useEffect, useState } from 'react'
import countryService from './services/countries';
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';

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

export default App
