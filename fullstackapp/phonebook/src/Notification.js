import React from "react";

export default ({ notification }) => {
  if (!notification.message) return null;
  return (
    <div className={notification.type}>
      <p>{notification.message}</p>
    </div>
  );
};
