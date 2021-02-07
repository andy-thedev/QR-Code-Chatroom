import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      {users[0] && <h1>Welcome to {users[0].room}</h1>}
      <p>This service is offered by FAVOURANT, </p>
      <p>
        Toronto's first QR-code, real-time communication app
      </p>
    </div>
    {
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
    }
  </div>
);

export default TextContainer;