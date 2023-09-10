import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload ?? state;
    }
  }
})

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;