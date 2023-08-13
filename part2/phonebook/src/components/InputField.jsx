const InputField = ({ label, value, handleInput }) => {
  return (
    <div>
      {label} <input value={value} onChange={handleInput}/>
    </div>
  );
}

export default InputField;