import { useState, useEffect, useRef } from 'react';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';

const App = () => {
  const blogFormRef = useRef();
  const loginFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const currentUserJson = localStorage.getItem('currentUser');

    if (!currentUserJson) return;

    const user = JSON.parse(currentUserJson);
    blogService.setToken(user.token);
    setUser(user);
    setInfoMessage(`Welcome back, ${user.name}`);
    setTimeout(() => setInfoMessage(''), 3000);
  }, []);

  const onLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      loginFormRef.current.toggleVisibility();
      setInfoMessage(`Hello, ${user.name}!`);
      setTimeout(() => setInfoMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const onLogout = () => {
    localStorage.clear();
    blogService.setToken(null);
    setUser(null);
    setInfoMessage('See Ya Soon');
    setTimeout(() => setInfoMessage(''), 3000);
  };

  const addNewBlog = async (newBlogInfo) => {
    try {
      const newBlog = await blogService.create(newBlogInfo);
      blogFormRef.current.toggleVisibility();
      setBlogs([...blogs, newBlog]);
      setInfoMessage(
        `A new blog, ${newBlog.title} by: ${newBlog.author} has been added.`
      );
      setTimeout(() => setInfoMessage(''), 3000);
    } catch (error) {
      setErrorMessage(
        `failed to add new blog, reason: ${error.response.data.error}`
      );
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const updateBlog = async (id, updateInfo) => {
    try {
      const updatedBlog = await blogService.update(id, updateInfo);
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    } catch (error) {
      setErrorMessage(
        `failed to update blog, reason: ${error.response.data.error}`
      );
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      setErrorMessage(
        `failed to delete blog, reason: ${error.response.data.error}`
      );
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const blogList = () => (
    <BlogList
      blogs={blogs}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
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
      <LoginForm
        handleLogin={onLogin}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
      />
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
