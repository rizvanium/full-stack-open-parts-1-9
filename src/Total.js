const Total = ({ exercises }) => {
  let total = exercises.reduce((acc, current) => acc + current, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

export default Total;
