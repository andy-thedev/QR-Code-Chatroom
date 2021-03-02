import React, { useState, useEffect } from 'react';

import axios from 'axios';

import queryString from 'query-string';

function DashboardScreen(props) {
    const [rooms, setRooms] = useState([]);

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
        console.log("haha:", rooms.data);
        setRooms(rooms.data);
    }

    useEffect(() => {
        const {room} = queryString.parse(`?room=testroom&reference=1`);
        getAllRooms(room);
    }, []);

    return(
        <div className="outerContainer">
            <div className="columnContainer">
                <div className="rowContainer">
                    <div className="roomContainer">
                        Can I get a spoon?
                    </div>
                    <div className="roomContainer">
                        {rooms.map(room => 
                            <div key={room._id}>
                                <div>{room.room}</div>
                                <div>{room.roomReference}</div>
                            </div>)
                        }
                    </div>
                    <div className="roomContainer">
                        I would like to order
                    </div>
                </div>
                <div className="rowContainer">
                    <div className="roomContainer">
                        Can I get a spoon?
                    </div>
                    <div className="roomContainer">
                        It's a little cold here
                    </div>
                    <div className="roomContainer">
                        I would like to order
                    </div>
                </div>
                <div className="rowContainer">
                    <div className="roomContainer">
                        Can I get a spoon?
                    </div>
                    <div className="roomContainer">
                        It's a little cold here
                    </div>
                    <div className="roomContainer">
                        I would like to order
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardScreen;