import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    id: 'some_id',
    title: 'Test Blogano',
    author: 'The Test Guy',
    url: 'http://www.test-url.non-existent-tld',
    likes: 100,
    user: {
      id: 'mock_user_id',
      name: 'Test User',
      username: 'testUser',
    },
  };
  let mockUpdateHandler;
  let mockRemovalHandler;
  let container;

  beforeEach(() => {
    mockUpdateHandler = jest.fn();
    mockRemovalHandler = jest.fn();
    container = render(
      <Blog
        blog={blog}
        handleUpdate={mockUpdateHandler}
        handleRemoval={mockRemovalHandler}
      />
    ).container;
  });

  test('displays only title and author by default', async () => {
    const visibleElem = await screen.findByText(`${blog.title} ${blog.author}`);
    const invisibleElem = container.querySelector('.blog-details');

    expect(visibleElem).toBeDefined();
    expect(visibleElem).not.toHaveStyle('display: none');

    expect(invisibleElem).toBeDefined();
    expect(invisibleElem).toHaveStyle('display: none');
  });

  test('displays details when the button controlling the shown details has been clicked', async () => {
    const blogInfo = await screen.findByText(`${blog.title} ${blog.author}`);
    const viewButton = await screen.findByText('view');
    const blogDetails = container.querySelector('.blog-details');

    expect(blogInfo).toBeDefined();
    expect(blogDetails).toBeDefined();
    expect(viewButton).toBeDefined();

    expect(blogInfo).not.toHaveStyle('display: none');
    expect(blogDetails).toHaveStyle('display: none');

    const user = userEvent.setup();
    await user.click(viewButton);

    expect(blogDetails).not.toHaveStyle('display: none');
  });

  test('when like button is clicked twice, the event handler fires twice', async () => {
    const likeButton = await screen.findByText('like');

    const user = userEvent.setup();
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdateHandler.mock.calls).toHaveLength(2);
  });
});