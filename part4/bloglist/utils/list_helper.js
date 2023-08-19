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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
