const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");

router.post("/register", async (req, res) => {
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
                user,
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

module.exports = router;