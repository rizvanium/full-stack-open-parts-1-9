import { NotificationType } from "../types";

interface NotificationProps {
  text?: string;
  type: NotificationType;
}
const Notification = ({ text, type }: NotificationProps) => {
  if (!text) return null;

  const color = type === NotificationType.Info ? 'green' : 'red';
  const style = {
    color
  };

  return (
    <p style={style}>{text}</p>
  );
}

export default Notification;
