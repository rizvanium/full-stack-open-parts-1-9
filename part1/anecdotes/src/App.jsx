import { useState } from 'react'
import Button from './Button';
import Anecdote from './Anecdote';

const App = () => {
  const anecdotesDB = [
    {
      text: 'If it hurts, do it more often.',
      votes: 0,
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0,
    },
    {
      text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
    },
    {
      text: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', 
      votes: 0,
    },
    {
      text: 'The only way to go fast, is to go well.',
      votes: 0,
    }
  ];

  const [anecdotes, setAnecdotes] = useState(anecdotesDB);
  const getRandomIndex = () => getRandom(0, anecdotes.length - 1 || 0);

  const [selectedIdx, setSelectedIdx] = useState(getRandomIndex());

  const selectNextAnecdote = () => setSelectedIdx(getRandomIndex());
  const incVoteCount = () => setAnecdotes(anecdotes.map((anecdote, idx) => idx === selectedIdx ? {...anecdote, votes: anecdote.votes + 1} : {...anecdote}));
 
  const totalVotes = anecdotes.map(anecdote => anecdote.votes).reduce((total, current) => total + current, 0);
  const selectedAnecdote = anecdotes[selectedIdx];
  const mostPopularAnecdote = anecdotes.reduce((best, current) => current.votes > best.votes ? current : best);

  return (
    <div>
      <Anecdote 
        title="Anecdote of the day" 
        text={selectedAnecdote.text} 
        votes={selectedAnecdote.votes} />
      <Button text="vote" handleClick={incVoteCount} />
      <Button text="next anecdote" handleClick={selectNextAnecdote} />
      { totalVotes ? <Anecdote 
          title="Anecdote with most votes" 
          text={mostPopularAnecdote.text} 
          votes={mostPopularAnecdote.votes}/> : <p>No votes gathered yet</p> }

    </div>
  )
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
} 

export default App