import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let mockCreateBlog;
  let container;

  beforeEach(() => {
    mockCreateBlog = jest.fn();
    container = render(<BlogForm createBlog={mockCreateBlog} />).container;
  });

  test('calls event handler with valid params when submit button is clicked', async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button');
    const titleInput = screen.getByPlaceholderText('enter blog title');
    const authorInput = screen.getByPlaceholderText(
      'enter the name of blog author'
    );
    const urlInput = screen.getByPlaceholderText('enter blog url');

    await user.type(titleInput, 'Testino');
    await user.type(authorInput, 'Testoni');
    await user.type(urlInput, 'Testo.comio');
    await user.click(submitButton);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);

    const params = mockCreateBlog.mock.calls[0][0];

    expect(params.title).toBe('Testino');
    expect(params.author).toBe('Testoni');
    expect(params.url).toBe('Testo.comio');
  });
});
