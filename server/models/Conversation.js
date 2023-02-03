const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Conversation", conversationSchema);
