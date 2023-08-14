import { useEffect, useState } from 'react';
import personService from './services/persons';
import InputField from './components/InputField';
import NewPersonForm from './NewPersonForm';
import PersonsList from './PersonsList';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [persons, setPersons] = useState([]);
  
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchPhrase(event.target.value);

  const displayedPersonList = persons.filter(p => 
    p.name.toLowerCase().startsWith(searchPhrase.toLowerCase())
  );

  const replaceNumber = (person) => {
    const updatedPerson = {
      ...person,
      number: newNumber
    };

    personService.update(updatedPerson, person.id)
      .then(responseData => {
        setPersons(persons.map(p => p.id === person.id ? { ...responseData } : p));
        setNewName('');
        setNewNumber('');
      })
      .catch();
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    
    const normalizedName = newName.trim().toLowerCase(); 
    const normalizedNumber = newNumber.trim().toLowerCase(); 

    if (normalizedName === '' || normalizedNumber === '') {
      alert('all fields must be filled');
      return;
    }
    
    const duplicatePerson = persons.find(person => person.name.toLowerCase() === normalizedName);
    if (duplicatePerson) {
      const shouldReplaceNumber = confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`);

      if (!shouldReplaceNumber) return;

      return replaceNumber(duplicatePerson);
    }
    
    const newPerson = { 
      name: newName.trim(), 
      number: newNumber.trim() 
    };
    
    personService
      .create(newPerson)
      .then(person => {
        setPersons([...persons, person]);
        setNewName('');
        setNewNumber('');
      })
      .catch(err => console.log(err));
  }

  const deletePerson = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return;
    
    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id));
    }).catch();
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
      <PersonsList list={displayedPersonList} handleDeletion={deletePerson}/>
    </div>
  )
}

export default App