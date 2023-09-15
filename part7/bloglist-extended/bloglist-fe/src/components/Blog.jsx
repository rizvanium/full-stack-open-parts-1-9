import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const buttonText = showDetails ? 'hide' : 'view';
  const displayDetails = { display: showDetails ? '' : 'none' };
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addOneLike = async () => {
    dispatch(
      updateBlog(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      })
    );
  };

  const handleBlogRemoval = async () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
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
          <button className="remove-button" onClick={handleBlogRemoval}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
