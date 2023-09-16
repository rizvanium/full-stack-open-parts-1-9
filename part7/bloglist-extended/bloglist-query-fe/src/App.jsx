import { useState, useEffect, useRef } from 'react';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import { useNotificationDispatch } from './NotificationContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const App = () => {
  const queryClient = useQueryClient();

  const blogFormRef = useRef();
  const loginFormRef = useRef();
  const [user, setUser] = useState(null);
  const dispatchNotification = useNotificationDispatch();

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

  const blogsQueryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2,
  });

  if (blogsQueryResult.isLoading) {
    return <div>Loading data</div>;
  }

  if (blogsQueryResult.isError) {
    return (
      <div>
        The server providing you with blog information is having some issues
      </div>
    );
  }

  const blogs = blogsQueryResult.data;

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

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      // setBlogs(blogs.filter((blog) => blog.id !== id));
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
      handleRemoval={removeBlog}
      handleLogout={onLogout}
    />
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
