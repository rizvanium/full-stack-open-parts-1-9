import { useEffect, useRef } from 'react';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import { useQuery } from '@tanstack/react-query';
import { useUserValue } from './UserContext';

const App = () => {
  const blogFormRef = useRef();
  const loginFormRef = useRef();
  const user = useUserValue();

  useEffect(() => {
    blogService.setToken(user ? user.token : null);
  }, [user]);

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

  const blogList = () => <BlogList blogs={blogs} />;

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm />
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
