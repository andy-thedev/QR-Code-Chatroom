const config = require('./config');
const util = require('./util');
const jwt = require('jsonwebtoken');

// Database Imports
const mongoose = require("mongoose");
// Models
require("./models/ownerModel");
require("./models/chatRoomModel");
require("./models/messageModel");
const Message = mongoose.model("Message");

// Server Imports
const express = require('express');
const cors = require('cors');
// Routes
const ownerRoute = require('./routes/ownerRoute');
const chatroomRoute = require('./routes/chatroomRoute');
const messageRoute = require('./routes/messageRoute');

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
app.use('/messages', messageRoute);

const server = app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
})

//Websocket Setup
const io = socketio(server, {
  transports: ['websocket'],
  cors: true,
})

io.on('connection', (socket) => {
  console.log("Socket Connected bro");

  socket.on('joinRoom', ({chatroomId}) => {
    socket.join(chatroomId);
    console.log("A user joined the chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({chatroomId}) => {
    socket.leave(chatroomId);
    console.log("A user left the chatroom: " + chatroomId);
  })

  socket.on('sendMessage', async ({chatroomId, room, roomReference, message}) => {
    if (message.trim().length > 0) {
      const newMessage = new Message({
        room: room,
        roomReference: roomReference,
        message,
        socketId: socket.id,
      });
      io.to(chatroomId).emit('newMessage', {
        text: message,
        user: socket.id,
        roomReference: roomReference,
      });
      await newMessage.save();
      console.log("Message has been saved: " + message);
    }
  });

  socket.on('disconnect', () => {
    //
  })
});
