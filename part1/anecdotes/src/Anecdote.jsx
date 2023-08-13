
const Anecdote = ({title, text, votes}) => {
  return <div>
      <h1>{title}</h1>
      <p>{text}</p>
      <p>has {votes} votes</p>
  </div>
}

export default Anecdote;