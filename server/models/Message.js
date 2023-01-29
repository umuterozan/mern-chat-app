const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);
