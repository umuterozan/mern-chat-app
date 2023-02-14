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
            err: err.message,
        });
    }
});

router.get("/:conversationId", auth.authenticateToken, async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json({
            ok: true,
            messages
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            err: err.message,
        })
    }
})

module.exports = router;
