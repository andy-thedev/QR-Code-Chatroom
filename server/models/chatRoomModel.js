const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
  owner: {
      type: String,
      required: "Owner is required!",
  }
});

module.exports = mongoose.model("Chatroom", chatRoomSchema);