import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilterAction(state, action) {
      return action.payload ?? state;
    }
  }
})

export const { updateFilterAction } = filterSlice.actions;
export default filterSlice.reducer;