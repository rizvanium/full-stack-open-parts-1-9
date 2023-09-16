import Notification from './Notification';
import Blog from './Blog';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(logout());
  };

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

export default BlogList;
