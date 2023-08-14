const PersonsList = ({ list, handleDeletion }) => {
  return (
    <div>
      { list.map(person => 
        <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDeletion(person.id)}>delete</button></p>
      )}
    </div>
  );
}

export default PersonsList;