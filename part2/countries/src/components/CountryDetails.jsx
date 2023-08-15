import WeatherDetails from './WeatherDetails';

const CountryDetails = ({ country }) => {
  return (<div>
    <h2>{country.name}</h2>
    <p>capital: {country.capitals ? country.capitals.join(', ') : 'no info'}</p>
    <p>area: {country.area}</p>
    <h3>languages:</h3>
    <ul>
      { Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>) }
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>
    <WeatherDetails country={country} />
  </div>)
}

export default CountryDetails;