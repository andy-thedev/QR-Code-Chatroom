import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';

import JoinScreen from './screens/JoinScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import OwnerChatScreen from './screens/OwnerChatScreen';

const App = () => {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("User_Token");
    if (token && !socket) {
      // If user has logged in, create a socket after token verification
      const newSocket = io("http://localhost:8000", {
        transports:['websocket'],
        // Sends token to back-end (server.js) to be verified
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      // If socket disconnects, raise error message
      newSocket.on("disconnect", () => {
        setSocket(null);
        console.log("Error, Socket Disconnected!")
      });

      // If socket cunnects successfully, raise successs message
      newSocket.on("connection", () => {
        console.log("Success, Socket Connected!");
      });

      // Set current socket as new socket
      setSocket(newSocket);
    }
  }

  // On render, attempt to set-up a socket
  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <Router>
      <Route path="/" exact component={JoinScreen} />
      <Route path="/register" component={RegisterScreen}/>
      <Route path="/login" component={LoginScreen} setupSocket={setupSocket}/>
      <Route path="/chat" component={ChatScreen} />
      <Route path="/ownerchat" component={OwnerChatScreen} socket={socket}/>
    </Router>
  );
}

export default App;
