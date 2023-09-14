import PropTypes from 'prop-types';
import Notification from './Notification';
import Blog from './Blog';

const BlogList = ({
  blogs,
  errorMessage,
  infoMessage,
  username,
  handleUpdate,
  handleRemoval,
  handleLogout,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <Notification message={errorMessage} isError={true} />}
      {infoMessage && <Notification message={infoMessage} isError={false} />}
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
            handleUpdate={handleUpdate}
            handleRemoval={handleRemoval}
          />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  errorMessage: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleRemoval: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default BlogList;
