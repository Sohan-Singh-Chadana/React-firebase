import React from "react";
import styled, { keyframes } from "styled-components";

// Toast slide-in animation
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Toast container styles
const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Individual toast styles
const Toast = styled.div`
  background-color: ${(props) =>
    props.type === "success"
      ? "#4caf50"
      : props.type === "error"
      ? "#f44336"
      : "#2196f3"};
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  animation: ${slideIn} 0.5s ease;
  opacity: 0.9;
`;

const NotificationToast = ({ notifications, removeNotification }) => {
  return (
    <ToastContainer>
      {notifications.map((notification) => (
        <Toast key={notification.id} type={notification.type}>
          {notification.message}
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default NotificationToast;
