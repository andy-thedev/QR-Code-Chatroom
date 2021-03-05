import React, { useEffect, useState } from 'react';

import axios from 'axios';

import InfoBar from './InfoBar';

import './component.css';

function DashboardUnit({ room, roomReference, socket }) {
  const [recentMessage, setRecentMessage] = useState('');

  const getRecentMessage = async() => {
    await axios.get("http://localhost:8000/messages/" + room + "/" + roomReference, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("User_Token"),
        },
    }).then((res) => {
        setRecentMessage(res.data.message);
    }).catch((err) => {
        if (err && err.res && err.res.message) {
            console.log(err.message);
        }
    });
  }

  useEffect(() => {
    
    // On render, get most recent message from database
    getRecentMessage();

    // Join room, and if a new message has been emitted from the room,
    // update recent message display with the emitted message
    if (socket) {
      socket.emit('joinRoom', {
        chatroomId: `?room=${room}&reference=${roomReference}`
      });

      socket.on('newMessage', (message) => {
        if (message.roomReference == roomReference) {
          setRecentMessage(message.text);
        }
      })
    }
  }, []);

  return(
    <div className="roomContainer">
      {/* <h1>{roomReference}</h1> */}
      <InfoBar room={""} roomReference={roomReference}/>
        <p className="recentMessage">{recentMessage ? recentMessage : "None"}</p>
    </div>
  )
}
  

export default DashboardUnit;