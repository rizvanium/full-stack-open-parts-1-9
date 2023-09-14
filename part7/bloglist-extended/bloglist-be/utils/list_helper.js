const dummy = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 1;
  }
  return 1;
};

const totalLikes = (blogs) =>
  !blogs ? 0 : blogs.reduce((total, post) => total + post.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
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
  if (blogs.length === 0 || blogs.length === 0) {
    return null;
  }

  return groupMax(blogs, 'author', 'blogs');
};

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return groupMax(blogs, 'author', 'likes');
};

const groupMax = (list, groupName, accumulator) => {
  if (!list || list.length === 0) {
    return null;
  }

  if (!groupName || accumulator === undefined) {
    return null;
  }

  const { max } = list.reduce(
    (groupWithMax, item) => {
      let { group, max } = groupWithMax;
      let propName = item[groupName];
      let accValueIncrease = item[accumulator] ?? 1;

      group[propName] = group[propName] ?? {
        [groupName]: propName,
        [accumulator]: 0,
      };

      group[propName] = {
        ...group[propName],
        [accumulator]: group[propName][accumulator] + accValueIncrease,
      };

      if (group[propName][accumulator] > max[accumulator]) {
        max = { ...group[propName] };
      }

      return { group, max };
    },
    { group: {}, max: { [groupName]: '', [accumulator]: 0 } }
  );

  return max;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
