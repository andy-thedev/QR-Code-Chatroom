import React from 'react';

import './component.css';

function TextContainer({ room, roomReference }) {
  return <div className="textContainer">
    <div>
      {<h1>Welcome to {room} {roomReference}</h1>}
      <div style={{marginTop: "5rem"}}>
        <h2>
          The owner is currently
        </h2>
      </div>
      <div style={{marginTop: "10rem"}}>
        <p>This service is offered by FAVOURANT, </p>
        <p>
          Toronto's first QR-code, real-time communication app
        </p>
      </div>
    </div>
  </div>
};

export default TextContainer;