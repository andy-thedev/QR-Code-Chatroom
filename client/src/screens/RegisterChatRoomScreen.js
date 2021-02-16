import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";

import './screen.css';

function RegisterChatRoomScreen(props) {
  const [room, setRoom] = useState('');

  const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const history = useHistory();

  const registerRoom = () => {
    if (userInfo) {
      const ownerEmail = userInfo.email
      axios.post("http://localhost:8000/chatroom/", { room, ownerEmail }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("User_Token"),
        },
      }).then((res) => {
          console.log(res.data.message);
          history.push('/');
      }).catch((err) => {
          if (err && err.res && err.res.message) {
              console.log(err.message);
          }
      });
    }
    else {
      console.log("Please register or log-in.")
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
          <h1 className="heading">Create Chat Room</h1>
          <div>
              <input placeholder="Room Name" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} />
          </div>
          <button onClick={registerRoom} className={'button mt-20'} type="submit">Create Room</button>
      </div>
    </div>
  );
}

export default RegisterChatRoomScreen;