import React, { createContext } from "react";
import NotificationToast from "../components/NotificationToast";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = React.useState([]);

  // Function to add a notification
  const addNotification = (type, message) => {
    const id = Date.now(); // Unique ID for the notification
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, type, message },
    ]);

    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 3000);
  };
  return (
    <>
      <NotificationContext.Provider value={{ addNotification }}>
        {children}
      </NotificationContext.Provider>
      {/* Notification Toast Component */}
      <NotificationToast notifications={notifications} />
    </>
  );
};

export { NotificationProvider };

export default NotificationContext;
