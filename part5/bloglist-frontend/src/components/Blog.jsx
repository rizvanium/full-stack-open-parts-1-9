import { useState } from 'react';

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      <div style={displayDetails}>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
        <p>
          likes {blog.likes} <button>like</button>
        </p>
      </div>
    </div>
  );
};

export default Blog;
