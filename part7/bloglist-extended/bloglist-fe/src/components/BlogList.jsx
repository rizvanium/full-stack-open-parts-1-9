import PropTypes from 'prop-types';
import Notification from './Notification';
import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogList = ({ username, handleLogout }) => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {username} logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default BlogList;
