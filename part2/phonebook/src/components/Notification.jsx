const Notification = ({ message, isError }) => {
  const className = isError ? 'error' : 'info';

  if (message == null || message === '') {
    return null;
  }
  
  return <div className={`notification ${className}`}>
    {message}
  </div>
}

export default Notification;