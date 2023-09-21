import { useState } from 'react';
import { ADD_BOOK } from '../mutations';
import { ALL_BOOKS, ALL_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        const allBooks = data?.allBooks ?? [];
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });

      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        const allAuthors = data?.allAuthors ?? [];
        const newAuthor = response.data.addBook.author;
        const author = allAuthors.find((a) => a.name === newAuthor.name);
        if (author) {
          return {
            allAuthors: allAuthors.map((a) =>
              a.name === newAuthor.name ? { ...newAuthor } : a
            ),
          };
        }
        return {
          allAuthors: allAuthors.concat(newAuthor),
        };
      });
    },
  });
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published: +published, genres } });
    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
    navigate('/books');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
