const mongoose = require("mongoose");
const Message = mongoose.model("Message");

const express = require("express");

const { isAuth } = require("../util");

const router = express.Router();

router.get("/:room/:roomReference", isAuth ,async(req, res) => {
    const {room, roomReference} = req.params;
    const messages = await Message.findOne({room, roomReference}, {}, {sort: {'_id': -1}});
    res.send(messages);
});

module.exports = router;