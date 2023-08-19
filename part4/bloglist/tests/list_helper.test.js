const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe('total likes', () => {
  const listWithSingleBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Test Dummy 1',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Test Dummy 1',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Test Blog 2',
      author: 'Test Dummy 2',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 3,
      __v: 0,
    },
  ];

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog post equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithSingleBlog)).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(8);
  });
});

describe('favorite blog', () => {
  const listWithSingleBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Test Dummy 1',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Test Dummy 1',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Test Blog 2',
      author: 'Test Dummy 2',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 3,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Most Liked Blog',
      author: 'Test Dummy 3',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 900,
      __v: 0,
    },
  ];

  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test('when list contains one blog is equal to that blog', () => {
    const favorite = listHelper.favoriteBlog(listWithSingleBlog);
    console.log(favorite);
    expect(favorite).toStrictEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Test Dummy 1',
      likes: 5,
    });
  });

  test('when list contains multiple blogs is equal to most liked blog', () => {
    const favorite = listHelper.favoriteBlog(listWithMultipleBlogs);
    console.log(favorite);
    expect(favorite).toStrictEqual({
      title: 'Most Liked Blog',
      author: 'Test Dummy 3',
      likes: 900,
    });
  });
});
