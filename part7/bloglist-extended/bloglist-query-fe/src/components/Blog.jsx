import PropTypes from 'prop-types';
import { useState } from 'react';

const Blog = ({ blog, handleUpdate, handleRemoval }) => {
  const [showDetails, setShowDetails] = useState(false);

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
    handleUpdate({
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
  handleUpdate: PropTypes.func.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Blog;
