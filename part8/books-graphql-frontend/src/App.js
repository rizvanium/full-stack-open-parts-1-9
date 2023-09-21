import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    navigate('/');
  };

  const navLoggedIn = () => (
    <>
      <button onClick={() => navigate('/books/new')}>add book</button>
      <button onClick={logout}>logout</button>
    </>
  );

  const navLoggedOut = () => (
    <button onClick={() => navigate('/login')}>login</button>
  );

  return (
    <div>
      <header>
        <nav>
          <button onClick={() => navigate('/')}>authors</button>
          <button onClick={() => navigate('/books')}>books</button>
          {token ? navLoggedIn() : navLoggedOut()}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Authors />}></Route>
          <Route path="/books" element={<Books />}></Route>
          {token && <Route path="/books/new" element={<NewBook />}></Route>}
          {!token && (
            <Route
              path="/login"
              element={<LoginForm setToken={setToken} />}
            ></Route>
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;
