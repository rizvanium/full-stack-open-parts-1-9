import { useState } from 'react';
import Notification from './Notification';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, errorMessage, infoMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    await handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>log in to application</h2>
      {errorMessage && <Notification message={errorMessage} isError={true} />}
      {infoMessage && <Notification message={infoMessage} isError={false} />}
      <form onSubmit={login}>
        <div>
          username&nbsp;
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password&nbsp;
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
};

export default LoginForm;
