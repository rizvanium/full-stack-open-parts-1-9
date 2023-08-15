const CountryList = ({ countries, handleSelection }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return <div>
    {countries.map((country) => <p key={country.area}>{country.name}  <button onClick={() => handleSelection(country.name)}>show</button></p>)}
  </div>
}

export default CountryList;