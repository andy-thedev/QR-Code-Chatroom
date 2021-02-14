const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

const express = require("express");
const router = express.Router();

const { isAuth } = require('../util');

router.post("/", isAuth, async(req, res) => {
    const { room, ownerEmail } = req.body;

    // Check if chatroom name only contains alphabets and whitespaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(room)) throw "Chatroom name can only contain spaces and alphabets.";

    // Check if the chatroom name already exists
    const chatroomExists = await Chatroom.findOne({ room });
    if (chatroomExists) throw "Chatroom with that name already exists.";

    // If all given information is valid, save information to the database
    const chatroom = new Chatroom({
        room,
        ownerEmail,
    });
    const createdChatroom = await chatroom.save();

    if (createdChatroom) {
        // Upon saving the chatroom to the database successfully,
        // send success message
        res.json({
            message: `${room} has been created successfully!`,
        });
    }
    // If the new room could not be saved, send error message
    return res.json({
        message: `${room} was not accepted to the database.`,
    });
});

module.exports = router;
