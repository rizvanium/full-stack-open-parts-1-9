import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteCount } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter)));
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    console.log('vote', id)
    dispatch(increaseVoteCount(id));
    dispatch(setMessage(`You've voted for '${content}'`))
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      { sortedAnecdotes.map(anecdote => 
          <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote} 
            handleVote={() => vote(anecdote)} 
          />)
      }
    </div>
  );
}

export default AnecdoteList;