import { useState, useEffect, useRef } from 'react';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const blogFormRef = useRef();
  const loginFormRef = useRef();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const currentUserJson = localStorage.getItem('currentUser');

    if (!currentUserJson) return;

    const user = JSON.parse(currentUserJson);
    blogService.setToken(user.token);
    setUser(user);
    dispatch(
      setNotification(
        { content: `Welcome back, ${user.name}`, isError: false },
        3
      )
    );
  }, []);

  const onLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      loginFormRef.current.toggleVisibility();
      dispatch(
        setNotification({ content: `Hello, ${user.name}!`, isError: false }, 3)
      );
    } catch (error) {
      dispatch(
        setNotification(
          { content: error.response.data.error, isError: true },
          3
        )
      );
    }
  };

  const onLogout = () => {
    localStorage.clear();
    blogService.setToken(null);
    setUser(null);
    dispatch(setNotification({ content: 'See Ya Soon', isError: false }, 3));
  };

  const blogList = () => (
    <BlogList username={user.name} handleLogout={onLogout} />
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
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
