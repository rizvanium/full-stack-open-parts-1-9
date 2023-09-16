import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [, notificationDispatch] = useContext(NotificationContext);
  return (notification, timeoutInSeconds) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: notification,
    });

    setTimeout(
      () =>
        notificationDispatch({
          type: 'CLEAR_NOTIFICATION',
        }),
      timeoutInSeconds * 1000
    );
  };
};

export default NotificationContext;
