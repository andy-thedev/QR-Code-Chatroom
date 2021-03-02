import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import './screen.css';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const loginOwner = () => {
    axios.post("http://localhost:8000/owner/login", {
      email,
      password
    })
    .then((res) => {
        console.log(res.data.message);
        localStorage.setItem("User_Token", res.data.token);
        localStorage.setItem("UserInfo", JSON.stringify(res.data.userInfo));
        history.push('/dashboard');
    })
    .catch((err) => {
        if (err && err.res && err.res.message) {
            console.log(err.message);
        }
    });
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