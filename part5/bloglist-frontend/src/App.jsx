import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
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
    setTimeout(() => setInfoMessage(''), 4000);
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
      setTimeout(() => setInfoMessage(''), 4000);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    blogService.setToken(null);
    setUser(null);
    setInfoMessage('Bye, see you soon');
    setTimeout(() => setInfoMessage(''), 4000);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      });
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
      setBlogs([...blogs, newBlog]);
      setInfoMessage(
        `A new blog, ${newBlog.title} by: ${newBlog.author} has been added.`
      );
      setTimeout(() => setInfoMessage(''), 4000);
    } catch (error) {
      setErrorMessage(
        `failed to add new blog, reason: ${error.response.data.error}`
      );
      setTimeout(() => setErrorMessage(''), 4000);
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

  const newBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:&nbsp;
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:&nbsp;
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:&nbsp;
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      {user == null && loginForm()}
      {user != null && blogList()}
      {user != null && newBlogForm()}
    </div>
  );
};

export default App;
