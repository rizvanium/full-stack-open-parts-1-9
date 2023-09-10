import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload ?? state;
    },
    removeMessage(state, action) {
      return '';
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;