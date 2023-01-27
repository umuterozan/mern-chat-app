const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");
const paginatedResults = require("../helpers/paginatedResults");

router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            ok: true,
            user: {
                _id: user._id,
                name: user.name,
            },
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            err,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
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
                user: {
                    _id: user._id,
                    name: user.name,
                },
                token: auth.createToken(user._id),
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

router.get("/users", paginatedResults(User), async (req, res) => {
    res.json(res.paginatedResults);
});

module.exports = router;
