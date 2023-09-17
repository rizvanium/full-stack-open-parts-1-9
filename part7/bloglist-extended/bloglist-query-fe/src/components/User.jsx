import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import userService from '../services/users';

const User = () => {
  const id = useParams().id;

  const userQueryResult = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.get(id),
    retry: 2,
  });

  if (userQueryResult.isLoading) {
    return <p>Loading user data</p>;
  }

  if (userQueryResult.isError) {
    return <p>Failed to load user data</p>;
  }

  const user = userQueryResult.data;
  const displayAddedBlogs = (blogs) => (
    <ul>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </ul>
  );

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      {user.blogs.length === 0 ? <p>none</p> : displayAddedBlogs(user.blogs)}
    </div>
  );
};

export default User;
