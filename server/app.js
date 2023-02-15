require("dotenv").config();

const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const PORT = 5000;
const HOSTNAME = "localhost";
require("./dbConnection")();
const cors = require("cors");
const user = require("./routes/user");
const conversation = require("./routes/conversation");
const message = require("./routes/message");

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/api/user", user);
app.use("/api/conversation", conversation);
app.use("/api/message", message);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // message
    socket.on("sendMessage", ({ senderId, receiverId, content }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                content,
            });
        }
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server app listening on http://${HOSTNAME}:${PORT}`);
});
