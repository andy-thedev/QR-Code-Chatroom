import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';

import './screen.css';

function ManageRoomsScreen(props) {

    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);

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
            console.log("here are the rooms: ", rooms.data);
            setRoomName(rooms.data[0].room);
            setRooms(rooms.data);
        }
    }

    useEffect(() => {
        const owner = JSON.parse(localStorage.getItem("UserInfo"));
        getAllRooms(owner.email);
    }, []);

    return (
        <div className="joinOuterContainer">
        <div className="joinInnerContainerList">
            <h1 className="heading">Edit Rooms</h1>
            <div className="title">{roomName}</div>
          
            <div className="columnContainer">
                <table className="room-list">
                    <thead>
                        <th>Partition</th>
                        <th>ID</th>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room._id}>
                                <td>{room.roomReference}</td>
                                <td>{room._id}</td>
                                <td>
                                    <button className="button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          
        </div>
      </div>
    );
}

export default ManageRoomsScreen;