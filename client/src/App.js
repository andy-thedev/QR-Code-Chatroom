import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import JoinScreen from './screens/JoinScreen';
import RegisterOwnerScreen from './screens/RegisterOwnerScreen';
import RegisterChatRoomScreen from './screens/RegisterChatRoomScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ChatScreen from './screens/ChatScreen';
import OwnerChatScreen from './screens/OwnerChatScreen';

const App = () => {

  return (
    <BrowserRouter>
      <Route path="/" exact component={JoinScreen} />
      <Route path="/register" component = {RegisterOwnerScreen} exact/>
      <Route path="/register/room" component={RegisterChatRoomScreen} exact/>
      <Route path="/login" component={LoginScreen}/>
      <Route path="/dashboard" component={DashboardScreen}/>
      <Route path="/chat" component = {ChatScreen}/>
      <Route path="/ownerchat" component={OwnerChatScreen}/>
    </BrowserRouter>
  );
}

export default App;
