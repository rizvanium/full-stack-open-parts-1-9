import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ blog, handleUpdate, handleRemoval }) => {
  const [showDetails, setShowDetails] = useState(false);
  const buttonText = showDetails ? 'hide' : 'view';
  const displayDetails = { display: showDetails ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addOneLike = async () => {
    try {
      await handleUpdate(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemoval(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      <div className='blog-details' style={displayDetails}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={addOneLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Blog;
