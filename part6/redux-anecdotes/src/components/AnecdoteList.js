import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteCount } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter)));
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVoteCount(id));
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      { sortedAnecdotes.map(anecdote => 
          <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote} 
            handleVote={() => vote(anecdote.id)} 
          />)
      }
    </div>
  );
}

export default AnecdoteList;