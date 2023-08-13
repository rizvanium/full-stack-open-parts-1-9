import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchPhrase(event.target.value);

  const displayedPersonList = persons.filter(p => 
    p.name.toLowerCase().startsWith(searchPhrase.toLowerCase())
  );

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
      <div>
        filter shown with <input value={searchPhrase} onChange={handleSearchChange}/>
      </div>
      <h2>Add a new</h2>
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
      { displayedPersonList.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App