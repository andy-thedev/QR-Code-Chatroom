import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import io from 'socket.io-client';

import JoinScreen from './screens/JoinScreen';
import RegisterOwnerScreen from './screens/RegisterOwnerScreen';
import RegisterChatRoomScreen from './screens/RegisterChatRoomScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
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
          token: localStorage.getItem("User_Token"),
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
    <BrowserRouter>
      <Route path="/" exact component={JoinScreen} />
      <Route 
        path="/register"
        render = {() => <RegisterOwnerScreen setupSocket={setupSocket}/>}
        exact/>
      <Route path="/register/room" component={RegisterChatRoomScreen} exact/>
      <Route 
        path="/login" 
        render = {() => <LoginScreen setupSocket={setupSocket}/>}
      />
      <Route path="/dashboard" component={DashboardScreen}/>
      <Route 
        path="/chat" 
        render={() => <ChatScreen socket={socket}/>}
      />
      <Route path="/ownerchat" component={OwnerChatScreen} socket={socket}/>
    </BrowserRouter>
  );
}

export default App;
