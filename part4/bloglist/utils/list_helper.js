const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) =>
  !blogPosts ? 0 : blogPosts.reduce((total, post) => total + post.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
