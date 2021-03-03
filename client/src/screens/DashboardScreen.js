import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import DashboardUnit from '../components/DashboardUnit';

function DashboardScreen(props) {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);

    const getAllRooms = async (room) => {
        const rooms = await axios.get("http://localhost:8000/chatroom/" + room, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("User_Token"),
            },
        }).catch((err) => {
            if (err && err.res && err.res.message) {
                console.log(err.message);
            }
        });
        setRoomName(rooms.data[0].room);
        // getAllRecentMessages(rooms.data);
        convertRoomsTriple(rooms.data);
    }

    const convertRoomsTriple = (rooms) => {
        rooms.sort((a,b) => a.roomReference - b.roomReference);
        const groupedRooms = [];
        while (rooms.length) {
            groupedRooms.push(rooms.splice(0,3));
        }
        setRooms(groupedRooms);
    }

    useEffect(() => {
        const owner = JSON.parse(localStorage.getItem("UserInfo"));
        getAllRooms(owner.email);
    }, []);

    return(
        <div className="outerContainer">
            <div className="columnContainer">
                <h1 className="title">{roomName}</h1>
                    {rooms.map((triple, i) => (
                        <div className="rowContainer" key={i}>
                            {triple.map((room) => (
                                <Link key={room._id} to={`/chat?room=${room.room}&reference=${room.roomReference}`}>
                                    <DashboardUnit room={room.room} roomReference={room.roomReference}/>
                                </Link>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DashboardScreen;