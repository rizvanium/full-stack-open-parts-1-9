import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  });

  const anecdoteUpdateMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      const updatedAnecdotes = anecdotes.map(anecdote => 
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, updatedAnecdotes);
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `voted for anecdote '${updatedAnecdote.content}'`
      })
      setTimeout(() => notificationDispatch({
        type: 'CLEAR_NOTIFICATION'
      }), 5000);
    }
  });
  
  if (result.isLoading) {
    return <div>loading data</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available due to server problems</div>
  }
  
  const anecdotes = result.data;
  
  const handleVote = (anecdote) => {
    anecdoteUpdateMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    });
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
