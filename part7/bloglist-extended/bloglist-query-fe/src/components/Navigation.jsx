import { useUserValue, useUserDispatch } from '../UserContext';
import { useNotificationDispatch } from '../NotificationContext';
import blogService from '../services/blogs';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const user = useUserValue();
  const dispatchUserUpdate = useUserDispatch();
  const dispatchNotification = useNotificationDispatch();

  const logout = () => {
    dispatchUserUpdate({ type: 'REMOVE_USER' });
    blogService.setToken(null);
    dispatchNotification({ content: 'See Ya Soon', isError: false }, 3);
  };

  const linkStyle = { marginLeft: 5 };
  const navBarStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lightGrey',
  };

  return (
    <div style={navBarStyle}>
      <Link style={linkStyle} to="/">
        blogs
      </Link>
      <Link style={linkStyle} to="/users">
        users
      </Link>
      <span style={linkStyle}>{user.name} logged in&nbsp;</span>
      <span>
        <button onClick={logout}>logout</button>
      </span>
    </div>
  );
};

export default Navigation;
