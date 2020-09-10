import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./styles/user.scss";

function User() {
  return (
    <div className="user__container">
      <div className="avatar__container">
        <Avatar className="avatar">C</Avatar>
        <h3 className="messenger__title">Messenger</h3>
      </div>
    </div>
  );
}

export default User;
