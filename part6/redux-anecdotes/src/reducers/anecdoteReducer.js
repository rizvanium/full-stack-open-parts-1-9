import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { increaseVoteCount, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
}

export const createAnecdote = (text) => async (dispatch) => {
  const anecdote = await anecdoteService.createNew(text);
  dispatch(appendAnecdote(anecdote))
}