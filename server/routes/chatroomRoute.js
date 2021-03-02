const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

const express = require("express");
const router = express.Router();

const { isAuth } = require('../util');

router.get("/:room", isAuth, async(req, res) => {
    const room = req.params.room;
    const rooms = await Chatroom.find({room});
    res.send(rooms);
})

router.post("/", isAuth, async(req, res) => {
    const { room, ownerEmail, numRooms } = req.body;

    // Check if chatroom name only contains alphabets and whitespaces
    const nameRegex = /^[A-Za-z\s\d]+$/;
    if (!nameRegex.test(room)) throw "Chatroom name can only contain spaces, digits, and alphabets.";

    // Check if the chatroom name already exists
    const chatroomExists = await Chatroom.findOne({ room });
    if (chatroomExists) throw "Chatroom with that name already exists.";

    // Check if number of rooms is a valid, whole number
    if ((numRooms % 1 !== 0) || (numRooms <= 0)) throw "Number of rooms must be a whole number greater than 0"

    let references = Array.from({length: numRooms}, (v, k) => k+1);
    references.map(async (reference) => {
        const chatroom = new Chatroom({
            room,
            roomReference: reference,
            ownerEmail,
        });
        const createdChatroom = await chatroom.save();
        if (!createdChatroom) {
            return res.json({
                message: `${room} with id ${reference} was not accepted to the database.`,
            })
        }
    });

    res.json({
        message: `${numRooms} ${room} have been created successfully!`,
    })
});

module.exports = router;
