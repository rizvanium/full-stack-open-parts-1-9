import { useState } from 'react';
import { useUserValue } from '../UserContext';
import blogService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';

const BlogDetails = ({ blog, handleUpdate, handleRemoval }) => {
  const currentUser = useUserValue();
  const [newComment, setNewComment] = useState('');
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
      dispatchNotification(
        {
          content: `${currentUser.name} added new comment in a blog ${blog.title}`,
          isError: false,
        },
        3
      );
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
    newCommentMutation.mutate({ id: blog.id, text: newComment });
    setNewComment('');
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
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {commentList()}
    </div>
  );
};

export default BlogDetails;
