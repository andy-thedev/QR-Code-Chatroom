const mongoose = require("mongoose");
const Owner = mongoose.model("Owner");

const express = require("express");
const router = express.Router();

const { getToken } = require("../util");

router.post('/register', async (req, res) => {
    const {name, email, password, room} = req.body;

    //Check if given email and password is valid
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
    if (password.length < 4) throw "Password must be at least 4 characters long.";

    //Check if given email/chatroom already exists in the database
    const ownerExists = await Owner.findOne({ email });
    const roomExists = await Owner.findOne({ room });
    if (roomExists) throw "Chatroom name already exists.";
    if (ownerExists) throw "Email already exists";

    //If all given information is valid, save information to database
    const owner = new Owner({
        name,
        email,
        password,
        room,
    });
    await owner.save();

    //If new owner has been registered, send success response message
    res.json({
        message: `${name} has registered successfully!`,
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const owner = await Owner.findOne({
        email,
        password,
    });

    if (!owner) throw "Email and Password did not match.";

    res.json({
        message: `${owner.name} has logged in successfully!`,
        token: getToken(owner),
    });
});

module.exports = router;
