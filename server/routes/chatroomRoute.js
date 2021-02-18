const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

const express = require("express");
const router = express.Router();

const { isAuth } = require('../util');

router.post("/", isAuth, async(req, res) => {
    const { room, ownerEmail, numRooms } = req.body;

    // Check if chatroom name only contains alphabets and whitespaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(room)) throw "Chatroom name can only contain spaces and alphabets.";

    // Check if the chatroom name already exists
    const chatroomExists = await Chatroom.findOne({ room });
    if (chatroomExists) throw "Chatroom with that name already exists.";

    // Check if number of rooms is a valid, whole number
    if ((numRooms % 1 !== 0) || (numRooms <= 0)) throw "Number of rooms must be a whole number greater than 0"

    let ids = Array.from({length: numRooms}, (v, k) => k+1);
    ids.map(async (id) => {
        const chatroom = new Chatroom({
            room,
            roomId: id,
            ownerEmail,
        });
        const createdChatroom = await chatroom.save();
        if (!createdChatroom) {
            return res.json({
                message: `${room} with id ${id} was not accepted to the database.`,
            })
        }
    });

    res.json({
        message: `${numRooms} ${room} have been created successfully!`,
    })
});

module.exports = router;
