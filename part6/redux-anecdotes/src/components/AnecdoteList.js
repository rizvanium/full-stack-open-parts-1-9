import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteCount } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter)));
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch(increaseVoteCount(id));
    dispatch(setMessage(`You've voted for '${content}'`))
    setTimeout(() => dispatch(removeMessage()), 5000);
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