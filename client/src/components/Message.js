import React from 'react';
import ReactEmoji from 'react-emoji';

import './component.css';

function Message({ message: { text, user }, currentUser }) {
  let isSentByCurrentUser = false;

  if (user === currentUser) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{(user !== 'owner') ? 'User' : 'Owner'}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{(user !== 'owner') ? 'User' : 'Owner'}</p>
          </div>
        )
  );
}

export default Message;