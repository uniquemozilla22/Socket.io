import "./App.css";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8000");

function App() {
  const [messageInput, setMessageInput] = useState([]);

  const [message, setMessage] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message });
    setMessage([...message, messageInput]);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage([...message, data.message]);
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="App">
      {message.map((m) => (
        <>
          {m}
          <br />
        </>
      ))}
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <input type="submit" value={"Send"} />
      </form>
    </div>
  );
}

export default App;
