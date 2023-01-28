const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", chatSchema);
