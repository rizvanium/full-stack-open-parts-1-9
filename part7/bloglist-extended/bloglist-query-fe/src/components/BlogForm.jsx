import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../NotificationContext';

const BlogForm = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogCreationMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] });
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.concat(newBlog));
      dispatchNotification(
        {
          content: `A new blog, ${newBlog.title} by: ${newBlog.author} has been added.`,
          isError: false,
        },
        3
      );
    },
    onError: (error) => {
      dispatchNotification(
        {
          content: `failed to add new blog, reason: ${error.response.data.error}`,
          isError: true,
        },
        3
      );
    },
  });

  const handleAddBlog = (event) => {
    event.preventDefault();

    blogCreationMutation.mutate({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:&nbsp;
          <input
            id="new-title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="enter blog title"
          />
        </div>
        <div>
          author:&nbsp;
          <input
            id="new-author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="enter the name of blog author"
          />
        </div>
        <div>
          url:&nbsp;
          <input
            id="new-url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="enter blog url"
          />
        </div>
        <button id="new-blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
