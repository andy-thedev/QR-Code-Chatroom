import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './component.css';

function DashboardUnit({ room, roomReference }) {
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
    getRecentMessage()
  }, []);

  return(
    <div className="roomContainer">
      <h1>{roomReference}</h1>
      <h3>{recentMessage}</h3>
    </div>
  )
}
  

export default DashboardUnit;