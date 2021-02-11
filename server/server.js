const config = require('./config');

//Database Imports
const mongoose = require("mongoose");
require("./models/ownerModel");
require("./models/chatRoomModel");

//Server Imports
const express = require('express');
const cors = require('cors');
const ownerRoute = require('./routes/ownerRoute');

//Websocket Imports
const socketio = require('socket.io');

//Mongoose Setup
const DATABASE_URL = config.DATABASE
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch((err) => console.log(err.message));

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
})

const Owner = mongoose.model("Owner");
const Chatroom = mongoose.model("Chatroom");

//Server Setup
const app = express();
app.use(cors());
app.use(express.json()); //For body parsing
app.use('/owner', ownerRoute);

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000")
})

//Websocket Setup
const io = socketio(server, {
  transports: ['websocket'],
  cors: true,
})

io.on('connection', (socket) => {
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
