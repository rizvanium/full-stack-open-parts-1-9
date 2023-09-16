import { useState, useEffect, useRef } from 'react';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const blogFormRef = useRef();
  const loginFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatchNotification = useNotificationDispatch();
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const currentUserJson = localStorage.getItem('currentUser');

    if (!currentUserJson) return;

    const user = JSON.parse(currentUserJson);
    blogService.setToken(user.token);
    setUser(user);
    dispatchNotification(
      { content: `Welcome back, ${user.name}`, isError: false },
      3
    );
  }, []);

  const onLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      loginFormRef.current.toggleVisibility();
      dispatchNotification(
        { content: `Hello, ${user.name}!`, isError: false },
        3
      );
    } catch (error) {
      dispatchNotification(
        { content: error.response.data.error, isError: true },
        3
      );
    }
  };

  const onLogout = () => {
    localStorage.clear();
    blogService.setToken(null);
    setUser(null);
    dispatchNotification({ content: 'See Ya Soon', isError: false }, 3);
  };

  const addNewBlog = async (newBlogInfo) => {
    try {
      const newBlog = await blogService.create(newBlogInfo);
      blogFormRef.current.toggleVisibility();
      setBlogs([...blogs, newBlog]);
      dispatchNotification(
        {
          content: `A new blog, ${newBlog.title} by: ${newBlog.author} has been added.`,
          isError: false,
        },
        3
      );
    } catch (error) {
      dispatchNotification(
        {
          content: `failed to add new blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      );
    }
  };

  const updateBlog = async (id, updateInfo) => {
    try {
      const updatedBlog = await blogService.update(id, updateInfo);
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    } catch (error) {
      dispatchNotification(
        {
          content: `failed to update blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      );
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      dispatchNotification(
        {
          content: `failed to delete blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      );
    }
  };

  const blogList = () => (
    <BlogList
      blogs={blogs}
      username={user.name}
      handleUpdate={updateBlog}
      handleRemoval={removeBlog}
      handleLogout={onLogout}
    />
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addNewBlog} />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm handleLogin={onLogin} />
    </Togglable>
  );

  return (
    <div>
      {user == null && loginForm()}
      {user != null && blogList()}
      {user != null && blogForm()}
    </div>
  );
};

export default App;
