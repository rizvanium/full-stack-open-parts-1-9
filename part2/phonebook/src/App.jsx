import { useEffect, useState } from 'react';
import personService from './services/persons';
import InputField from './components/InputField';
import Notification from './components/Notification';
import NewPersonForm from './NewPersonForm';
import PersonsList from './PersonsList';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPhrase, setSearchPhrase] = useState('');
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState({ text: '', isError: false });
  
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
        setMessage({
          text: `Successfully replaced ${person.name} phone number`,
          isError: false
        });
        setTimeout(() => setMessage({ text: '', isError: false }), 5000);
      })
      .catch(error => {
        setMessage({
          text: error.response.data.error,
          isError: true
        });
        setTimeout(() => setMessage({ text: '', isError: false }), 5000);
      });
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    
    const normalizedName = newName.trim().toLowerCase(); 
    const normalizedNumber = newNumber.trim().toLowerCase(); 

    if (normalizedName === '' || normalizedNumber === '') {
      setMessage({
        text: `All fields must be filled`,
        isError: true
      });
      setTimeout(() => setMessage({ text: '', isError: false }), 5000);
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
        setMessage({
          text: `Successfully added ${person.name} to a contact list`,
          isError: false
        });
        setTimeout(() => setMessage({ text: '', isError: false }), 5000);
      })
      .catch(error => {
        setMessage({
          text: error.response.data.error,
          isError: true
        });
        setTimeout(() => setMessage({ text: '', isError: false }), 5000);
      });
  }

  const deletePerson = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return;
    
    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id));
      setMessage({
        text: `Successfully removed ${name} from a contact list`,
        isError: false
      });
      setTimeout(() => setMessage({ text: '', isError: false }), 5000);
    }).catch(() => {
      setMessage({
        text: `Information of ${name} has already been removed from the server`,
        isError: false
      });
      setTimeout(() => setMessage({ text: '', isError: false }), 5000);
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} isError={message.isError}/>
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