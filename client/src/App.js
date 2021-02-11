import React from 'react';

import JoinScreen from './screens/JoinScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={JoinScreen} />
      <Route path="/register" component={RegisterScreen}/>
      <Route path="/login" component={LoginScreen}/>
      <Route path="/chat" component={ChatScreen} />
    </Router>
  );
}

export default App;
