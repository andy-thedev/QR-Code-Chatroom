import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';

import './screen.css';

function RegisterOwnerScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const registerOwner = () => {
        axios.post("http://localhost:8000/owner/register", {
            name,
            email,
            password,
        })
        .then((res) => {
            console.log(res.data.message);
            localStorage.setItem("User_Token", res.data.token);
            localStorage.setItem("UserInfo", JSON.stringify(res.data.userInfo));
            history.push('/register/room');
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
            <button onClick={registerOwner} className={'button mt-20'} type="submit">Register</button>
        </div>
      </div>
    );
}

export default RegisterOwnerScreen;