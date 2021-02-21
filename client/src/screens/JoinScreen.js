import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './screen.css';

function JoinScreen() {
  const [room, setRoom] = useState('');
  const [id, setId] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Room Name" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room Id" className="joinInput mt-20" type="text" onChange={(event) => setId(event.target.value)} />
        </div>
        <Link onClick={e => (!room || !id) ? e.preventDefault() : null} to={`/chat?room=${room}&id=${id}`}>
          <button className={'button mt-20'} type="submit">Submit</button>
        </Link>
      </div>
    </div>
  );
}

export default JoinScreen;