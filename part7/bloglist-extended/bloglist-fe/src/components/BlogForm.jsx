import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title,
        author,
        url,
      })
    );
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
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
