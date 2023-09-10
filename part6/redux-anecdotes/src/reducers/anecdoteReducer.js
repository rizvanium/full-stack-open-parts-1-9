import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      const id = updatedAnecdote.id;
      return state.map(anecdote => anecdote.id === id ? {
        ...updatedAnecdote
      } : anecdote)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
}

export const createAnecdote = (text) => async (dispatch) => {
  const anecdote = await anecdoteService.createNew(text);
  dispatch(appendAnecdote(anecdote))
}

export const increaseVoteCount = ({id, content, votes }) => async (dispatch) => {
  const anecdote = await anecdoteService.update(id, { content, votes: votes + 1 });
  dispatch(updateAnecdote(anecdote))
}