import io from "socket.io-client";
import { useState, useEffect } from "react"

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
    }
  }
  const sendMessage = () => {
    // e.preventDefault();
    socket.emit("sendMessage", { message, room });
  }

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setReceiveMessage(data.message);
    });
  }, [socket]);


  return (
    <div className="justify-center items-center">
      <input placeholder="room no." onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>

      <input placeholder="...message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      <h2>Received Messages:</h2>
      {receiveMessage}
    </div>
  );
}

export default App;
