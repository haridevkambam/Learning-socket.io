import io from "socket.io-client";
import { useState, useEffect } from "react"

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");
  const sendMessage = () => {
    // e.preventDefault();
    socket.emit("sendMessage", { message });
  }

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setReceiveMessage(data.message);
    });
  }, [socket]);


  return (
    <div className="justify-center items-center">
      <input placeholder="...message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      <h2>Received Messages:</h2>
      {receiveMessage}
    </div>
  );
}

export default App;
