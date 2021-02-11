import React, { useState } from 'react';

import './screen.css';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <button className={'button mt-20'} type="submit">Sign In</button>
        </div>
      </div>
    );
}

export default Login;