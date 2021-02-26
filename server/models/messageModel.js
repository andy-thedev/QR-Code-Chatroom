const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            required: "Room name is required!",
        },
        roomReference: {
            type: String,
            required: "Please provide the room reference",
        },
        message: {
            type: String,
            required: "Message to be saved is required!"
        },
        socketId: {
            type: String,
            required: "User's socket id is required!"
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);