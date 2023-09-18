import { useUserValue } from '../UserContext';
import blogService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';

const BlogDetails = ({ blog, handleUpdate, handleRemoval }) => {
  const currentUser = useUserValue();
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const newCommentMutation = useMutation(blogService.addComment, {
    onSuccess: (newComment) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] });
      const updatedBlogs = blogs.map((blog) =>
        blog.id === newComment.blog
          ? { ...blog, comments: blog.comments.concat(newComment) }
          : blog
      );
      queryClient.setQueryData({ queryKey: ['blogs'] }, updatedBlogs);
    },
    onError: (error) => {
      dispatchNotification(
        {
          content: `failed to add a new comment, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      );
    },
  });

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

  const addComment = (event) => {
    event.preventDefault();
    const commentText = event.target.comment.value;
    newCommentMutation.mutate({ id: blog.id, text: commentText });
    event.target.comment.value = '';
  };

  const commentList = () => {
    if (blog.comments.length === 0) {
      return <p>no comments</p>;
    }

    return (
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    );
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
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      {commentList()}
    </div>
  );
};

export default BlogDetails;
