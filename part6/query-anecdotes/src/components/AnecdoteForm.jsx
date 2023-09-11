import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `created new anecdote '${newAnecdote.content}'`
      });
      setTimeout(() => notificationDispatch({
        type: 'CLEAR_NOTIFICATION'
      }), 5000);
    },
    onError: (someStuff) => {
      console.log(someStuff);
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length of 5 characters or more'
      });
      setTimeout(() => notificationDispatch({
        type: 'CLEAR_NOTIFICATION'
      }), 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 });
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
