import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    message: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});
