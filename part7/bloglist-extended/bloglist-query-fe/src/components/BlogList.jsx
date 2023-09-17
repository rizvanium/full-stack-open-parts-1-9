import PropTypes from 'prop-types';
import BlogListItem from './BlogListItem';

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
