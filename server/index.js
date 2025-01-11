import express from "express";
import http, { METHODS } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, () => {
    cors: {
        origin: "http://localhost:3000"
        METHODS: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "http://localhost:3000",
    withCredentials: true
}));


server.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});



