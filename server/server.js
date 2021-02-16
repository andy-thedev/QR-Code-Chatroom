const config = require('./config');
const util = require('./util');
const jwt = require('jsonwebtoken');

// Database Imports
const mongoose = require("mongoose");
// Models
require("./models/ownerModel");
require("./models/chatRoomModel");

// Server Imports
const express = require('express');
const cors = require('cors');
// Routes
const ownerRoute = require('./routes/ownerRoute');
const chatroomRoute = require('./routes/chatroomRoute');

// Websocket Imports
const socketio = require('socket.io');

// Mongoose Setup
const DATABASE_URL = config.DATABASE
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch((err) => console.log(err.message));

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
})

// Server Setup
const app = express();
app.use(cors());
app.use(express.json()); //For body parsing
// Connect Routes to api's
app.use('/owner', ownerRoute);
app.use('/chatroom', chatroomRoute);

const server = app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
})

//Websocket Setup
const io = socketio(server, {
  transports: ['websocket'],
  cors: true,
})

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (err) {}
});

io.on('connection', (socket) => {
  console.log("Socket Connected");

  socket.on('join', () => {
    // socket.join(user.room);
  });

  socket.on('sendMessage', () => {
    // io.to(user.room).emit('message', { user: user.name, text: message });
  });

  socket.on('disconnect', () => {
    //
  })
});
