import PropTypes from 'prop-types';
import Notification from './Notification';
import Blog from './Blog';

const BlogList = ({ blogs, username, handleRemoval, handleLogout }) => {
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
          <Blog key={blog.id} blog={blog} handleRemoval={handleRemoval} />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleRemoval: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default BlogList;
