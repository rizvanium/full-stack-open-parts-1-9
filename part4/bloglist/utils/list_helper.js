const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  !blogs ? 0 : blogs.reduce((total, post) => total + post.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce(
    (favorite, current) =>
      favorite.likes > current.likes
        ? {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes,
          }
        : {
            title: current.title,
            author: current.author,
            likes: current.likes,
          },
    (blog) => ({
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    })
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const { max } = blogs.reduce(
    (groupWithMax, blog) => {
      let { group, max } = groupWithMax;
      const author = blog.author;

      group[author] = group[author] ?? {
        author,
        blogs: 0,
      };

      group[author] = { ...group[author], blogs: group[author].blogs + 1 };

      if (group[author].blogs > max.blogs) {
        max = { ...group[author] };
      }

      return { group, max };
    },
    { group: {}, max: { author: '', blogs: 0 } }
  );

  return max;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
