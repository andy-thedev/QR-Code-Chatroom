const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: "Room name is required!",
  },
  owner: {
      type: String,
      required: "Owner name is required!",
  }
});

module.exports = mongoose.model("Chatroom", chatRoomSchema);