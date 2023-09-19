import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <nav>
          <button onClick={() => navigate('/')}>authors</button>
          <button onClick={() => navigate('/books')}>books</button>
          <button onClick={() => navigate('/books/new')}>add book</button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Authors />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/new" element={<NewBook />}></Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
