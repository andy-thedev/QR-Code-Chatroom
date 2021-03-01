import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

import './component.css';

const Messages = ({ messages, currentUser }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} currentUser={currentUser}/></div>)}
  </ScrollToBottom>
);

export default Messages;