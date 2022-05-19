import "./App.css";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:8000");

function App() {
  const [message, setMessage] = useState(null);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message });
  };

  return (
    <div className="App">
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value={"Send"} />
      </form>
    </div>
  );
}

export default App;
