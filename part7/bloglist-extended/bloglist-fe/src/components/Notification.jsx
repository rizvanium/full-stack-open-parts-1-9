import { useSelector } from 'react-redux';

const Notification = () => {
  const { content, isError } = useSelector((state) => state.message);

  if (!content) return null;

  return (
    <p className={`notification ${isError ? 'error' : 'info'}`}>{content}</p>
  );
};

export default Notification;
