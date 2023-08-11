const Content = ({ parts, exercises }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part} exerciseCount={exercises[index]} />
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
