import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';

import JoinScreen from './screens/JoinScreen';
import RegisterOwnerScreen from './screens/RegisterOwnerScreen';
import RegisterChatRoomScreen from './screens/RegisterChatRoomScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ChatScreen from './screens/ChatScreen';
import OwnerChatScreen from './screens/OwnerChatScreen';
import ManageRoomsScreen from './screens/ManageRoomsScreen';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <NavigationBar/>
        <Route path="/" exact component={JoinScreen}/>
        <Route path="/register" component = {RegisterOwnerScreen} exact/>
        <Route path="/register/room" component={RegisterChatRoomScreen} exact/>
        <Route path="/login" component={LoginScreen}/>
        <Route path="/dashboard" component={DashboardScreen}/>
        <Route path="/chat" component = {ChatScreen}/>
        <Route path="/ownerchat" component={OwnerChatScreen}/>
        <Route path="/manage/rooms" component={ManageRoomsScreen}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
