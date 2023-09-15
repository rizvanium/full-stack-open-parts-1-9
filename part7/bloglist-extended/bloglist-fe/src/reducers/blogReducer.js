import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) =>
        blog.id === id ? { ...action.payload } : blog
      );
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (request) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(request);
    dispatch(addBlog(newBlog));
    dispatch(
      setNotification(
        {
          content: `A new blog, ${newBlog.title} by: ${newBlog.author} has been added.`,
          isError: false,
        },
        3
      )
    );
  } catch (error) {
    dispatch(
      setNotification(
        {
          content: `failed to add new blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      )
    );
  }
};

export const updateBlog = (id, updates) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.update(id, updates);
    dispatch(blogSlice.actions.updateBlog(updatedBlog));
  } catch (error) {
    dispatch(
      setNotification(
        {
          content: `failed to update blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      )
    );
  }
};

export const removeBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id);
    dispatch(blogSlice.actions.removeBlog(id));
  } catch (error) {
    dispatch(
      setNotification(
        {
          content: `failed to delete blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      )
    );
  }
};

export default blogSlice.reducer;
