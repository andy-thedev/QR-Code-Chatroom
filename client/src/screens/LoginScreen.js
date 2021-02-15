import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import './screen.css';

import { login } from '../actions/ownerActions'

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const loginOwner = () => {
    login(email, password, history, props);
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
          <h1 className="heading">Login</h1>
          <div>
              <input placeholder="Email" className="joinInput" type="text" onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
              <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button onClick={loginOwner} className={'button mt-20'} type="submit">Sign In</button>
      </div>
    </div>
  );
}

export default LoginScreen;