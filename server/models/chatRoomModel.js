const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: "Room name is required!",
  },
  roomId: {
    type: String,
    required: "Please provide the room number/id"
  },
  ownerEmail: {
      type: String,
      required: "Owner email is required!",
  }
});

module.exports = mongoose.model("Chatroom", chatRoomSchema);