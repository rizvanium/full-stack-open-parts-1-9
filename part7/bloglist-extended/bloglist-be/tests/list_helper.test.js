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
      title: 'First Most Liked Blog',
      author: 'Test Dummy 3',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 900,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Last Most Liked Blog',
      author: 'Test Dummy 4',
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
    expect(favorite).toStrictEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Test Dummy 1',
      likes: 5,
    });
  });

  test('when list contains multiple blogs is equal to most liked blog', () => {
    const favorite = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(favorite).toStrictEqual({
      title: 'Last Most Liked Blog',
      author: 'Test Dummy 4',
      likes: 900,
    });
  });
});

describe('mostBlogs returns', () => {
  const singleBlogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Test Blog 1',
      author: 'Test Dummy 1',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithUniqueAuthors = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Test Blog 1',
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
      title: 'Test Blog 3',
      author: 'Test Dummy 3',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 900,
      __v: 0,
    },
  ];

  const listWithSameAuthors = [
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
      title: 'Test Blog 3',
      author: 'Test Dummy 2',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 900,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Test Blog 4',
      author: 'Test Dummy 2',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 900,
      __v: 0,
    },
  ];

  test('null when list is empty', () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test('correct blog author with a blog count of one when list contains one blog', () => {
    let mostBlogs = listHelper.mostBlogs(singleBlogList);
    expect(mostBlogs).toStrictEqual({
      author: 'Test Dummy 1',
      blogs: 1,
    });
  });

  test('first author in the list when list contains multiple blogs with unique authors', () => {
    let mostBlogs = listHelper.mostBlogs(listWithUniqueAuthors);
    expect(mostBlogs).toStrictEqual({
      author: 'Test Dummy 1',
      blogs: 1,
    });
  });

  test('author with the most blogs when list contains multiple blogs with the same author', () => {
    let mostBlogs = listHelper.mostBlogs(listWithSameAuthors);
    expect(mostBlogs).toStrictEqual({
      author: 'Test Dummy 2',
      blogs: 3,
    });
  });
});

describe('mostLikes returns', () => {
  const singleBlogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Test Blog 1',
      author: 'Test Dummy 1',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithSameAuthors = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Test Dummy 1',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 9,
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
      title: 'Test Blog 3',
      author: 'Test Dummy 2',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 4,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Test Blog 4',
      author: 'Test Dummy 2',
      url: 'http://www.asdasdasdasxcxzcg.com',
      likes: 3,
      __v: 0,
    },
  ];

  test('[null] when blog list is empty, null or undefined', () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test('the only author in the list when list contains one blog', () => {
    const mostLikes = listHelper.mostLikes(singleBlogList);
    expect(mostLikes).toStrictEqual({
      author: 'Test Dummy 1',
      likes: 5,
    });
  });

  test('most liked author in the list when list contains multiple blogs', () => {
    const mostLikes = listHelper.mostLikes(listWithSameAuthors);
    expect(mostLikes).toStrictEqual({
      author: 'Test Dummy 2',
      likes: 10,
    });
  });
});
