import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Books = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>failed to fetch books from a server</div>;
  }

  const books = result.data.allBooks;
  const genres = [...new Set(books.flatMap((book) => book.genres))];

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
        <button key={genre}>{genre}</button>
      ))}
      <button>all genres</button>
    </div>
  );
};

export default Books;
