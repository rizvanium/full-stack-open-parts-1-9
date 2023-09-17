import { useUserValue } from '../UserContext';

const BlogDetails = ({ blog, handleUpdate, handleRemoval }) => {
  const currentUser = useUserValue();

  const addOneLike = () => {
    handleUpdate({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const removeBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemoval(blog.id);
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes <button onClick={addOneLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {currentUser.username === blog.user.username && (
        <button className="remove-button" onClick={removeBlog}>
          remove
        </button>
      )}
    </div>
  );
};

export default BlogDetails;
