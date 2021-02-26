import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';

import './component.css';

const TextContainer = ({ room, roomReference }) => (
  <div className="textContainer">
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
    {/* {
      users
        ? (
          <div>
            <h1>Users currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    } */}
  </div>
);

export default TextContainer;