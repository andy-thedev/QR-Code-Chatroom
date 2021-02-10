const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    room: {
      type: String,
      required: "Room is required!",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Owner", ownerSchema);