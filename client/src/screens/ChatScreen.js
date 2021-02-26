import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';

import TextContainer from '../components/TextContainer';
import Messages from '../components/Messages';
import InfoBar from '../components/InfoBar';
import Input from '../components/Input';

import './screen.css';

const ChatScreen = ({ socket }) => {
  const location = useLocation();
  const socketJoinId = location.search;

  const [room, setRoom] = useState('');
  const [roomReference, setRoomReference] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      console.log(message);
      socket.emit('sendMessage', 
        {chatroomId: socketJoinId}, 
        room, 
        roomReference, 
        message, 
      );
      setMessage('');
    }
  }

  useEffect(() => {
    // Fetch room query from url
    const { room, reference } = queryString.parse(socketJoinId);
    setRoom(room);
    setRoomReference(reference);
    console.log(socket);
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId: socketJoinId,
      });
    }
  }, []);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} roomReference={roomReference}/>
        <Messages messages={messages} name={''} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer room={room} roomReference={roomReference}/>
    </div>
  );
}

export default ChatScreen;
