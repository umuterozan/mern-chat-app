require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 5000;
const HOSTNAME = "localhost";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./models/User");
const auth = require("./auth")

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/react_chat_app", () => {
    console.log("MongoDB connected!");
});

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            ok: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            err,
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { name, password} = req.body
        const user = await User.findOne({ name });

        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                ok: false,
                err: "There is no such user",
            });
        }

        if (same) {
            res.status(200).json({
                ok: true,
                user,
                token: auth.createToken(user._id)
            });
        } else {
            res.status(401).json({
                ok: false,
                err: "Passwords are not matched",
            });
        }
    } catch (err) {
        res.status(500).json({
            ok: false,
            err,
        });
    }
});

app.get("/chat", auth.authenticateToken, (req, res) => {
    res.status(200).json({
        ok: true,
        user: req.user
    })
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server app listening on http://${HOSTNAME}:${PORT}`);
});
