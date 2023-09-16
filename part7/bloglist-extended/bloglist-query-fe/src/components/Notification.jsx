import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();
  if (!notification) return null;

  const { content, isError } = notification;

  return (
    <p className={`notification ${isError ? 'error' : 'info'}`}>{content}</p>
  );
};

export default Notification;
