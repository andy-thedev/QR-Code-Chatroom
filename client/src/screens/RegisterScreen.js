import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

import { register } from '../actions/ownerActions';

import './screen.css';

function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [chatroomName, setChatroomName] = useState('');
    const history = useHistory();

    const registerOwner = () => {
        register(name, email, password, chatroomName);
        history.push('/login');
    }

    return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
            <h1 className="heading">Register</h1>
            <div>
                <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                <input placeholder="Email" className="joinInput mt-20" type="text" onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div>
                <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div>
                <input placeholder="Chatroom Name" className="joinInput mt-20" type="text" onChange={(event) => setChatroomName(event.target.value)} />
            </div>
            <button onClick={registerOwner} className={'button mt-20'} type="submit">Register</button>
        </div>
      </div>
    );
}

export default Register;