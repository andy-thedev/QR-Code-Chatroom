import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';

import TextContainer from '../components/TextContainer';
import Messages from '../components/Messages';
import InfoBar from '../components/InfoBar';
import Input from '../components/Input';

import './screen.css';

const ENDPOINT = 'localhost:8000';

let socket;

const ChatScreen = ({ location }) => {
  const [room, setRoom] = useState('');
  const [roomId, setRoomId] = useState('');

  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { room, id } = queryString.parse(location.search);
    setRoom(room);
    setRoomId(id);
  }, []);

  return (
    <div className="outerContainer">
      <div className="container">
        <div style={{color: "black"}}>room: {room}</div>
        <div style={{color: "black"}}>id: {roomId}</div>
          {/* <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default ChatScreen;
