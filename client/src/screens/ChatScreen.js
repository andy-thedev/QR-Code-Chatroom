import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';

import io from 'socket.io-client';

import TextContainer from '../components/TextContainer';
import Messages from '../components/Messages';
import InfoBar from '../components/InfoBar';
import Input from '../components/Input';

import './screen.css';

function ChatScreen() {
  const location = useLocation();

  const [socket, setSocket] = useState(null);

  const [socketJoinId, setSocketJoinId] = useState('');
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
    const { room, reference } = queryString.parse(location.search);
    
    const newSocket = io("http://localhost:8000", {
        transports:['websocket'],
    });

    setSocketJoinId(location.search);
    setRoom(room);
    setRoomReference(reference);

    if (newSocket) {
      // Join room on connection
      newSocket.emit('joinRoom', {
        chatroomId: location.search,
      });
      // Begin Listening for a new message, and add the new message 
      // to the list of messages on client-side for rendering
      newSocket.on('newMessage', (message) => {
        setMessages(messages => [...messages, message]);
      })
    }

    setSocket(newSocket);
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