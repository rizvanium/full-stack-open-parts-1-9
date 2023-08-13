const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exerciseCount={part.exercises} />
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
