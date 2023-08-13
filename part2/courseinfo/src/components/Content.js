const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exerciseCount={part.exercises} />
      ))}
    </>
  );
};

function Part({ name, exerciseCount }) {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
}

export default Content;
