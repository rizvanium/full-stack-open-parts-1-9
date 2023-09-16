import PropTypes from 'prop-types';
import Notification from './Notification';
import Blog from './Blog';
import blogService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';

const BlogList = ({ blogs, username, handleLogout }) => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {username} logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={blogUpdateMutation.mutate}
            handleRemoval={blogRemovalMutation.mutate}
          />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default BlogList;
