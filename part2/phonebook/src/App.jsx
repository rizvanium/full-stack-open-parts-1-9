import { useState } from 'react';
import InputField from './components/InputField';
import NewPersonForm from './NewPersonForm';
import PersonsList from './PersonsList';

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
      <InputField label="filter shown with" value={searchPhrase} handleInput={handleSearchChange} />
      <h3>Add a new</h3>
      <NewPersonForm 
        nameValue={newName} 
        numberValue={newNumber} 
        handleSubmit={addNewPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <PersonsList list={displayedPersonList}/>
    </div>
  )
}

export default App