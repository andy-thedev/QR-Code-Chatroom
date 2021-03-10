import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';

import './screen.css';

function ManageRoomsScreen(props) {

    const [ownerEmail, setOwnerEmail] = useState('');
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [roomUpdate, setRoomUpdate] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

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
            setRooms(rooms.data);
        }
        else {
            setRooms(rooms);
        }
    }

    const deleteRoom = async (id) => {
        const deleted = await axios.delete("http://localhost:8000/chatroom/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("User_Token"),
            },
        }).catch((err) => {
            if (err) {
                console.log(err.message + ": " + err.response.data.message);
            }
        })

        if (deleted) {
            console.log(deleted.data.message, "_id:", id);
            setRoomUpdate(!roomUpdate);
        }
    }

    const editRoom = async (id) => {
        const updated = await axios.put("http://localhost:8000/chatroom/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("User_Token"),
            },
        }).catch((err) => {
            if (err) {
                console.log(err.message + ": " + err.response.data.message);
            }
        })

        if (updated) {
            console.log(updated.data.message, "_id:", id);
            setRoomUpdate(!roomUpdate);
            setModalVisible(false);
        }
    }

    useEffect(() => {
        const owner = JSON.parse(localStorage.getItem("UserInfo"));
        getAllRooms(owner.email);
    }, [roomUpdate]);

    return (
        <div className="joinOuterContainer">
        <div className="joinInnerContainerList">
            {rooms ? 
                <div>
                    <h1 className="heading">Edit Rooms</h1>
                    <div className="title">{roomName}</div>
                
                    <div className="columnContainer">
                        <table className="room-list">
                            <thead>
                                <tr>
                                    <th>Partition</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room._id}>
                                        <td>{room.roomReference}</td>
                                        <td>{room._id}</td>
                                        <td>
                                            <button className="manage-button">Edit</button>
                                            <button className="manage-button" onClick={() => deleteRoom(room._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> 
                :
                <h1 className="error_message">
                    <Link to={"/login"}>Click Here to Login</Link>
                </h1> 
            }
        </div>
      </div>
    );
}

export default ManageRoomsScreen;