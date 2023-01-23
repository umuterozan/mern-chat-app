const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const auth = require("../auth");

router.get("/api/chat", auth.authenticateToken, (req, res) => {
    res.status(200).json({
        ok: true,
        user: req.user,
    });
});

module.exports = router;
