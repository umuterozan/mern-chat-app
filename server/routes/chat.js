const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const auth = require("../auth");

router.post("/", auth.authenticateToken, async (req, res) => {
    if (req.user._id.toString() !== req.body.senderId) {
        return res.status(401).json({
            ok: false,
            err: "Not authorized",
        });
    }

    try {
        const chat = await Chat.create({
            members: [req.body.senderId, req.body.receiverId],
        });
        res.status(201).json({
            ok: true,
            chat,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            err,
        });
    }
});

router.get("/:userId", auth.authenticateToken, async (req, res) => {
    try {
        const chat = await Chat.find({
            members: { $in: [req.params.userId] },
        });

        res.status(200).json({
            ok: true,
            chat,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            err,
        });
    }
});

module.exports = router;
