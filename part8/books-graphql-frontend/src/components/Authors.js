import { useEffect, useState } from 'react';
import { ALL_AUTHORS } from '../queries';
import { EDIT_AUTHOR } from '../mutations';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

const Authors = () => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const result = useQuery(ALL_AUTHORS);
  useEffect(() => {
    if (!name && result.data && result.data.allAuthors.length !== 0) {
      setName(result.data.allAuthors[0].name);
    }
  }, [result.data]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const changeBirthYear = (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name, setBornTo: +birthYear } });
    setBirthYear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={changeBirthYear}>
        <label>
          name:{' '}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          <label>
            born:{' '}
            <input
              type="number"
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
