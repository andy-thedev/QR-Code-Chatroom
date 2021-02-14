const mongoose = require("mongoose");
const Owner = mongoose.model("Owner");

const express = require("express");
const router = express.Router();

const { getToken, isAuth } = require("../util");

// Registering a new owner
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    // Check if given email and password is valid
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
    if (password.length < 4) throw "Password must be at least 4 characters long.";

    // Check if given email already exists in the database
    const ownerExists = await Owner.findOne({ email });
    if (ownerExists) throw "Email already exists.";

    // If all given information is valid, save information to the database
    const owner = new Owner({
        name,
        email,
        password,
    });
    const registeredOwner = await owner.save();

    if (registeredOwner) {
        // Upon saving the owner to the database successfully, send success 
        // message and a freshly signed json web token to be saved locally
        return res.json({
            message: `${name} has registered successfully!`,
            token: getToken(owner),
        });
    }
    // If the new owner could not be saved, send error message
    return res.json({
        message: `${name} was not accepted to the database.`,
    });
});

// Owner login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Match owner's email and password in the database
    const owner = await Owner.findOne({
        email,
        password,
    });

    // Throw error if email and password was not found
    if (!owner) throw "Email and Password did not match.";

    // If email and password found, send success response message, along with
    // a freshly signed json web token to be saved locally
    res.json({
        message: `${owner.name} has logged in successfully!`,
        token: getToken(owner),
    });
});

module.exports = router;
