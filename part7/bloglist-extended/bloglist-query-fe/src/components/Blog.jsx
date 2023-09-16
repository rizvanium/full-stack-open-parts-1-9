import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../NotificationContext';

const Blog = ({ blog, handleRemoval }) => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();
  const [showDetails, setShowDetails] = useState(false);

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

  const buttonText = showDetails ? 'hide' : 'view';
  const displayDetails = { display: showDetails ? '' : 'none' };

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addOneLike = () => {
    blogUpdateMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const removeBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemoval(blog.id);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      <div className="blog-details" style={displayDetails}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={addOneLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {currentUser.username === blog.user.username && (
          <button className="remove-button" onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Blog;
