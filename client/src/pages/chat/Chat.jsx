import React, { useEffect, useState } from "react";
import "./chat.scss";
import io from "socket.io-client";
const socket = io("http://localhost:4000/");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  socket.on("receive-message", (message) => {
    console.log("receive-message");
    setMessages([...messages, message]);
  });

  const displayMessages = () => {
    return messages.map(({ id, message }, index) => {
      let className = "displayMessage";
      if (id === "me") className += " right";
      console.log({ className });
      return (
        <div key={index} className={className}>
          {message}
        </div>
      );
    });
  };

  const handleSendMessage = ({ event }) => {
    event.preventDefault();
    setMessages([...messages, { id: "me", message }]);
    socket.emit("message", { message });
    document.getElementById("messageInput").value = "";
  };

  const handleTypeMessage = ({ message }) => {
    setMessage(message);
  };

  return (
    <div className="chatContainer">
      <div className="displayMessages">{displayMessages()}</div>
      <form className="addMessage">
        <input
          id="messageInput"
          type="text"
          name="messageInput"
          onChange={(event) => {
            handleTypeMessage({ message: event.target.value });
          }}
        />
        <button onClick={(event) => handleSendMessage({ event })}>send</button>
      </form>
    </div>
  );
};

export default Chat;
