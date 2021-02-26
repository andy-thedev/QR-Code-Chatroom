const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: "Room name is required!",
  },
  roomReference: {
    type: String,
    required: "Please provide the room reference"
  },
  ownerEmail: {
      type: String,
      required: "Owner email is required!",
  }
});

module.exports = mongoose.model("Chatroom", chatRoomSchema);