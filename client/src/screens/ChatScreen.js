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
    // Prevent submit interaction from reloading the page
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', {
        chatroomId: socketJoinId, 
        room, 
        roomReference, 
        message, 
      });
      setMessage('');
    }
  }

  // On page load/reload, join room in socket following query provided in url
  useEffect(() => {
    // Fetch room query from url
    const { room, reference } = queryString.parse(socketJoinId);
    setRoom(room);
    setRoomReference(reference);
    
    if (socket) {
      // Join room on connection
      socket.emit('joinRoom', {
        chatroomId: socketJoinId,
      });
      
      // Begin Listening for a new message, and add the new message 
      // to the list of messages on client-side for rendering
      socket.on('newMessage', (message) => {
        setMessages(messages => [...messages, message]);
      })
    }
  }, []);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} roomReference={roomReference}/>
        <Messages messages={messages} currentUser={socket ? socket.id : ''} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer room={room} roomReference={roomReference}/>
    </div>
  );
}

export default ChatScreen;
