import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../mutations';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    if (result?.data?.login?.value) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
      navigate('/');
    }
  }, [result.data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username:{' '}
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password:{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
