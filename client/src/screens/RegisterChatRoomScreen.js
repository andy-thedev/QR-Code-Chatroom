import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";

import './screen.css';

function RegisterChatRoomScreen(props) {
  const [room, setRoom] = useState('');
  const [numRooms, setNumRooms] = useState('');

  const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const history = useHistory();

  const registerRoom = async () => {
    if (userInfo) {
      const ownerEmail = userInfo.email
      await axios.post("http://localhost:8000/chatroom/", { room, ownerEmail, numRooms }, {
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
              <input placeholder="Room/Table Name" className="joinInput" type="text" onChange={(e) => setRoom(e.target.value)} />
          </div>
          <div>
              <input placeholder="Number of Rooms" className="joinInput mt-20" type="text" onChange={(e) => setNumRooms(e.target.value)} />
          </div>
          <button onClick={registerRoom} className={'button mt-20'} type="submit">Create Room</button>
      </div>
    </div>
  );
}

export default RegisterChatRoomScreen;