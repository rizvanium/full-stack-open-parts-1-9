import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, handleBlogUpdate }) => {
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
      await handleBlogUpdate(blog.id, {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      <div style={displayDetails}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={addOneLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
