import { useQuery } from '@tanstack/react-query';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const UserList = () => {
  const usersQueryResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 2,
  });

  if (usersQueryResult.isLoading) {
    return <p>Loading...</p>;
  }

  if (usersQueryResult.isError) {
    return <p>Failed to load a list of users</p>;
  }

  const users = usersQueryResult.data;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
