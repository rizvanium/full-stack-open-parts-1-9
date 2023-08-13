import { useState } from 'react'
import Button from './Button';

const App = () => {
  const initialAnecdotes = [
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

  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const getRandomIndex = () => getRandom(0, anecdotes.length - 1 || 0);

  const [selectedIdx, setSelectedIdx] = useState(getRandomIndex());
  const selectedAnecdote = anecdotes[selectedIdx];

  const selectNextAnecdote = () => setSelectedIdx(getRandomIndex());
  const incVoteCount = () => setAnecdotes(anecdotes.map((anecdote, idx) => idx === selectedIdx ? {...anecdote, votes: anecdote.votes + 1} : anecdote));

  return (
    <div>
      <p>{selectedAnecdote.text}</p>
      <p>has {selectedAnecdote.votes} votes</p>
      <Button handleClick={incVoteCount}>
        vote
      </Button>
      <Button handleClick={selectNextAnecdote}>
        next anecdote
      </Button>
    </div>
  )
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
} 

export default App