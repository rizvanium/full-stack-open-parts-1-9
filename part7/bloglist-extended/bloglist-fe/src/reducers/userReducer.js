import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
        ? {
            name: action.payload.name,
            username: action.payload.username,
          }
        : state;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login(username, password);
    localStorage.setItem('currentUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(userSlice.actions.setUser(user));
    dispatch(
      setNotification({ content: `Hello, ${user.name}!`, isError: false }, 3)
    );
  } catch (error) {
    dispatch(
      setNotification({ content: error.response.data.error, isError: true }, 3)
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  blogService.setToken(null);
  dispatch(userSlice.actions.clearUser());
  dispatch(setNotification({ content: 'See Ya Soon', isError: false }, 3));
};

export const initializeUser = () => (dispatch) => {
  const currentUserJson = localStorage.getItem('currentUser');

  if (!currentUserJson) return;

  const user = JSON.parse(currentUserJson);
  blogService.setToken(user.token);
  dispatch(userSlice.actions.setUser(user));
  dispatch(
    setNotification(
      { content: `Welcome back, ${user.name}`, isError: false },
      3
    )
  );
};

export default userSlice.reducer;
