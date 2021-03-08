import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import io from 'socket.io-client';

import DashboardUnit from '../components/DashboardUnit';

function DashboardScreen(props) {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [socket, setSocket] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getAllRooms = async (room) => {
        const rooms = await axios.get("http://localhost:8000/chatroom/" + room, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("User_Token"),
            },
        }).catch((err) => {
            if (err) {
                console.log(err.message + ": " + err.response.data.message);
            }
        });

        if (rooms) {
            setRoomName(rooms.data[0].room);
            convertRoomsTriple(rooms.data);
            setIsLoggedIn(true);
        }
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

        const newSocket = io("http://localhost:8000", {
            transports: ['websocket'],
        });

        if (newSocket) {
            setSocket(newSocket);
        }
        getAllRooms(owner.email);
    }, []);

    return(
        <div className="outerContainer">
            {!isLoggedIn ?
                <h1 className="error_message">
                    <Link to={"/login"}>Click Here to Login</Link>
                </h1> 
                :
                <div className="content">
                    <h1 className="title">{roomName}</h1>
                    <div className="columnContainer">
                        {rooms.map((triple, i) => (
                            <div className="rowContainer" key={i}>
                                {triple.map((room) => (
                                    <DashboardUnit key={room._id} room={room.room} roomReference={room.roomReference} socket={socket}/>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default DashboardScreen;