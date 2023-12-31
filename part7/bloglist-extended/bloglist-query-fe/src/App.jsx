import { useEffect } from 'react';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import { useQuery } from '@tanstack/react-query';
import { useUserValue } from './UserContext';
import Users from './components/Users';
import User from './components/User';
import { Routes, Route, useMatch, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './NotificationContext';
import Notification from './components/Notification';
import Navigation from './components/Navigation';

const App = () => {
  const match = useMatch('/blogs/:id');
  const dispatchNotification = useNotificationDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const blogUpdateMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] });
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      queryClient.setQueryData({ queryKey: ['blogs'] }, updatedBlogs);
    },
    onError: (error) => {
      dispatchNotification(
        {
          content: `failed to update blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      );
    },
  });

  const blogRemovalMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      navigate('/');
    },
    onError: (error) => {
      dispatchNotification(
        {
          content: `failed to delete blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      );
    },
  });

  const user = useUserValue();
  useEffect(() => {
    blogService.setToken(user ? user.token : null);
    if (!user) {
      navigate('/login');
    } else {
      navigate('/');
    }
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

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const homeView = () => (
    <>
      <BlogList blogs={blogs} />
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
    </>
  );

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  );

  return (
    <div>
      {user != null && <Navigation />}
      <Notification />
      <h1>blog app</h1>
      <Routes>
        <Route path="/login" element={loginForm()} />
        <Route path="/" element={user != null && homeView()} />
        <Route path="/users" element={user != null && <Users />} />
        <Route path="/users/:id" element={user != null && <User />} />
        <Route
          path="/blogs/:id"
          element={
            user != null && (
              <BlogDetails
                blog={blog}
                handleUpdate={blogUpdateMutation.mutate}
                handleRemoval={blogRemovalMutation.mutate}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
