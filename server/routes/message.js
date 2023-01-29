const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../auth");

router.post("/", auth.authenticateToken, async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json({
            ok: true,
            message,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            err,
        });
    }
});

router.get("/:chatId", auth.authenticateToken, async (req, res) => {
    try {
        const messages = await Message.find({
            chatId: req.params.chatId
        })
        res.status(200).json({
            ok: true,
            messages
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            err
        })
    }
})

module.exports = router;
