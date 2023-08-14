import { useEffect, useState } from 'react'
import countryService from './services/countries';

function App() {
  const [searchWord, setSearchWord] = useState(null);
  const [countries, setCountries] = useState(null);

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  }

  useEffect(() => {

    if (!searchWord) return;

    countryService
      .getAll()
      .then(data => {
        const matchedCountries = data.filter(country => 
          country.name.common
            .toLowerCase()
            .includes(searchWord.toLowerCase()));
        console.log(matchedCountries);
        setCountries([...matchedCountries]);
      })
      .catch(err => console.log(err));
    
  }, [searchWord]);

  return (
    <div>
      <p>find countries <input type='text' onChange={handleInputChange} /></p>
    </div>
  )
}

export default App
