const mongoose = require("mongoose");
const Message = mongoose.model("Message");

const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const { room, roomReference } = req.body;
    const messages = await Message.find({room, roomReference});
    res.send(messages);
});

module.exports = router;