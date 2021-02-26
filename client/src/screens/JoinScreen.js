import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './screen.css';

function JoinScreen() {
  const [room, setRoom] = useState('');
  const [roomReference, setRoomReference] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Room Name" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room Reference(number/id/etc.)" className="joinInput mt-20" type="text" onChange={(event) => setRoomReference(event.target.value)} />
        </div>
        <Link onClick={e => (!room || !roomReference) ? e.preventDefault() : null} to={`/chat?room=${room}&reference=${roomReference}`}>
          <button className={'button mt-20'} type="submit">Submit</button>
        </Link>
      </div>
    </div>
  );
}

export default JoinScreen;