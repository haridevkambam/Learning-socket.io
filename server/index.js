import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", (data) => {
        console.log(data.message);
        socket.broadcast.emit("receiveMessage", data);
    })
});

server.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});



