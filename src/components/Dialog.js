import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextareaAutosize from "react-textarea-autosize";
import { db } from "../firebase";
import firebase from "firebase";
import "./styles/dialog.scss";

function Dialog() {
  const textareaRef = useRef(null);
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
    console.log(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your name", "John"));
  }, []);

  const handleSendMessage = (e, likeIcon) => {
    e.preventDefault();
    db.collection("messages").add({
      username,
      text: likeIcon || input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log(messages);
    setInput("");
  };
  const handleDelete = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    let isConfirm = confirm("Are you sure to delete all the messages?");
    let ref = db.collection("messages");
    if (isConfirm) {
      db.collection("messages")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            ref
              .doc(doc.id)
              .delete()
              .then(() => console.log("Messages Deleted"))
              .catch((e) => console.log(e.message));
          });
        });
    }
  };

  return (
    <div className="dialog__container">
      <div className="head__container">
        {/* <Avatar className="avatar">{username?.charAt(0).toUpperCase()}</Avatar> */}
        <img src="messenger.svg" alt="messenger icon" />
        <h3 className="head__title">Leave Some Messages</h3>
        <img
          src="close.svg"
          alt="delete all messages"
          onClick={handleDelete}
          className="icon__close"
          color="disabled"
        />
      </div>
      <div className="dialog__outsideBox">
        <div className="dialog__innerBox">
          {messages.map(({ id, message }, i) => {
            return (
              <div key={`${id}-${i}`}>
                {styleCondition("start", i, messages, message) && (
                  <p
                    className={`message__smallName ${
                      message.username === username &&
                      "message__smallName--user"
                    }`}
                  >
                    {message.username}
                  </p>
                )}
                <Message
                  only={styleCondition("only", i, messages, message)}
                  start={styleCondition("start", i, messages, message)}
                  mid={styleCondition("mid", i, messages, message)}
                  end={styleCondition("end", i, messages, message)}
                  key={id}
                  username={username}
                  message={message}
                />
              </div>
            );
          })}
        </div>
      </div>
      <form className="input__container">
        <TextareaAutosize
          ref={textareaRef}
          placeholder="輸入訊息..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              // console.log("break");
            } else if (e.key === "Enter") {
              handleSendMessage(e);
            }
          }}
        />
        {input ? (
          <SendIcon className="icon__send" onClick={handleSendMessage} />
        ) : (
          <img
            onClick={(e) => handleSendMessage(e, "👍")}
            className="icon__like"
            src="like.svg"
            alt="like icon"
          />
        )}
      </form>
    </div>
  );
}

export default Dialog;

const styleCondition = (expr, i, messages, message) => {
  switch (expr) {
    case "only":
      return !!(
        messages[i + 1]?.message.username !== message.username &&
        messages[i - 1]?.message.username !== message.username
      );
    case "start":
      return !!(
        messages[i + 1]?.message.username === message.username &&
        messages[i - 1]?.message.username !== message.username
      );
    case "mid":
      return !!(
        messages[i + 1]?.message.username === message.username &&
        messages[i - 1]?.message.username === message.username
      );
    case "end":
      return !!(
        messages[i + 1]?.message.username !== message.username &&
        messages[i - 1]?.message.username === message.username
      );
    default:
      return;
  }
};
