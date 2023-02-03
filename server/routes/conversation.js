const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const auth = require("../auth");

router.post("/", auth.authenticateToken, async (req, res) => {
    if (req.user._id.toString() !== req.body.sender._id) {
        return res.status(401).json({
            ok: false,
            err: "Not authorized",
        });
    }

    try {
        const conversation = await Conversation.create({
            members: [req.body.sender, req.body.receiver],
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

router.get("/:userId", auth.authenticateToken, async (req, res) => {
    try {
        const conversation = await Conversation.find({
            "members._id": { $in: [req.params.userId] },
        });

        res.status(200).json({
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
