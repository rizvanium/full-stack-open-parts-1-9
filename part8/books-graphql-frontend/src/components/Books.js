import { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Books = () => {
  const [filter, setFilter] = useState(null);
  const [genres, setGenres] = useState([]);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter, author: null },
  });

  useEffect(() => {
    if (result.data) {
      setGenres([
        ...new Set(genres.concat(books.flatMap((book) => book.genres))),
      ]);
    }
  }, [result.data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>failed to fetch books from a server</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  );
};

export default Books;
