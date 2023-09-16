import PropTypes from 'prop-types';

const Notification = ({ isError, message }) => {
  return (
    <p className={`notification ${isError ? 'error' : 'info'}`}>{message}</p>
  );
};

Notification.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
