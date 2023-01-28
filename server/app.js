require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 5000;
const HOSTNAME = "localhost";
require("./dbConnection")();
const cors = require("cors");
const user = require("./routes/user");
const conversation = require("./routes/conversation");
const chat = require("./routes/chat");

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/api/user", user);
app.use("/api/conversation", conversation);
app.use("/api/chat", chat);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server app listening on http://${HOSTNAME}:${PORT}`);
});
