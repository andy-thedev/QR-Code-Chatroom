const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    const { room, roomReference } = req.body;

});

module.exports = router;