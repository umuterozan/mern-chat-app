const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const auth = require("../auth");

router.post("/", auth.authenticateToken, async (req, res) => {
    try {
        const conversation = await Conversation.create({
            members: [req.body.senderId, req.body.receiverId],
        });
        res.status(201).json({
            ok: true,
            conversation,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            err,
        });
    }
});

module.exports = router;
