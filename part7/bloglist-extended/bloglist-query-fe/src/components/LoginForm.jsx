import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useUserDispatch } from '../UserContext';
import { useNotificationDispatch } from '../NotificationContext';
import loginService from '../services/login';
import blogService from '../services/blogs';
import styled from 'styled-components';

const LoginForm = ({ toggleVisibility }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatchUserUpdate = useUserDispatch();
  const dispatchNotification = useNotificationDispatch();

  const loginMutation = useMutation(loginService.login, {
    onSuccess: (user) => {
      dispatchUserUpdate({
        type: 'SET_USER',
        payload: user,
      });
      blogService.setToken(user.token);
      if (toggleVisibility) {
        toggleVisibility();
      }
      dispatchNotification(
        { content: `Hello, ${user.name}!`, isError: false },
        3
      );
      setUsername('');
      setPassword('');
    },
    onError: (error) => {
      dispatchNotification(
        { content: error.response.data.error, isError: true },
        3
      );
    },
  });

  const login = async (event) => {
    event.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div>
      <h2>log in to application</h2>
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
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #bf4f74;
  color: #bf4f74;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default LoginForm;
