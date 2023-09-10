import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    increaseVoteCount(state, action) {
      const id = action.payload
      return state.map(anecdote => anecdote.id === id ? 
        {
          ...anecdote,
          votes: anecdote.votes + 1
        } : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

export const { createAnecdote, increaseVoteCount, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
}