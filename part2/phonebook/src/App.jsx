import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addNewPerson = (event) => {
    event.preventDefault();
    
    const normalizedName = newName.trim().toLowerCase(); 
    const normalizedNumber = newNumber.trim().toLowerCase(); 

    if (normalizedName === '' || normalizedNumber === '') {
      alert('all fields must be filled');
      return;
    }

    if (persons.find(person => person.name.toLowerCase() === normalizedName)) {
      alert(`${normalizedName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName.trim(), number: newNumber.trim() }]);
    setNewName('');
    setNewNumber('');
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>        
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App