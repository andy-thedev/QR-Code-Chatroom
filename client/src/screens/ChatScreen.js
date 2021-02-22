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
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch room query from url
    const { room, id } = queryString.parse(socketJoinId);
    setRoom(room);
    setRoomId(id);

    if (socket) {
      socket.emit("joinRoom", {
        chatroomId: socketJoinId,
      });
    }
  }, [socket]);

  return (
    <div className="outerContainer">
      <div className="container">
        <div style={{color: "black"}}>room id</div>
          {/* <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  );
}

export default ChatScreen;
