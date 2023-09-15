import { createSlice } from '@reduxjs/toolkit';

const nofiticationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: '',
    isError: false,
  },
  reducers: {
    setMessage(state, action) {
      return action.payload ?? state;
    },
    clearMessage(state, action) {
      return '';
    },
  },
});

export const { setMessage, clearMessage } = nofiticationSlice.actions;
export const setNotification = (message, seconds) => (dispatch) => {
  dispatch(setMessage(message));
  setTimeout(() => dispatch(clearMessage()), seconds * 1000);
};
export default nofiticationSlice.reducer;
