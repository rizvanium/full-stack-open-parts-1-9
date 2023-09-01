import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const blogFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setInfoMessage(`Hello, ${user.name}!`);
      setTimeout(() => setInfoMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    blogService.setToken(null);
    setUser(null);
    setInfoMessage('Bye, see you soon');
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

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      {errorMessage && notification(errorMessage, true)}
      {infoMessage && notification(infoMessage, false)}
      <form onSubmit={handleLogin}>
        <div>
          username&nbsp;
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password&nbsp;
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const notification = (message, isError = false) => (
    <p className={`notification ${isError ? 'error' : 'info'}`}>{message}</p>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {errorMessage && notification(errorMessage, true)}
      {infoMessage && notification(infoMessage, false)}
      <p>
        {user.name} logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={updateBlog}
            handleRemoval={removeBlog}
          />
        ))}
    </div>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addNewBlog} />
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

const BlogForm = (props, ref) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddBlog = async (event) => {
    event.preventDefault();
    await props.createBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:&nbsp;
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:&nbsp;
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:&nbsp;
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
