import { useEffect, useState } from 'react'

function App() {
  const [country, setCountry] = useState(null);

  const handleInputChange = (event) => {
    setCountry(event.target.value);
  }
    console.log("pre effect");

  useEffect(() => {
    
  }, [country]);
  console.log("post effect");

  return (
    <div>
      <p>find countries <input type='text' onChange={handleInputChange} /></p>
    </div>
  )
}

export default App
