const Total = ({ parts }) => {
  let total = parts
    .map((part) => part.exercises)
    .reduce((acc, current) => acc + current, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

export default Total;
