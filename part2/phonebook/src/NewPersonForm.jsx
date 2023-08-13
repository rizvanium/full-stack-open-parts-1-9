import InputField from './components/InputField';

const NewPersonForm = ({ nameValue, numberValue, handleSubmit, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputField label="name:" value={nameValue} handleInput={handleNameChange} />
      <InputField label="number:" value={numberValue} handleInput={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default NewPersonForm;