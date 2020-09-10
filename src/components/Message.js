import React, { useEffect, useRef } from "react";

import "./styles/message.scss";

function Message(props) {
  const { message, username, only, start, mid, end } = props;
  const messageEndRef = useRef(null);
  const isUser = username === message.username;

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (message.text) {
    return (
      <div
        ref={messageEndRef}
        className={`message__container ${
          isUser && "message__container--user"
        } ${only && "message__container--only"} ${
          start && "message__container--start"
        } ${mid && "message__container--mid"} ${
          end && "message__container--end"
        }`}
      >
        <p>{message.text}</p>
      </div>
    );
  }
  return;
}

export default Message;
