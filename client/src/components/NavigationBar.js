import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsFillChatSquareDotsFill } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'

import './component.css';

function NavigationBar(props) {

    const [dropVisible, setDropVisible] = useState(false);

    return <div className="navbar">
        <div className="navbar-container">
            <div className="navbar-list brand">
                <div className="navbar-brand">
                    <Link to={"/dashboard"}>
                        QR-CHAT <BsFillChatSquareDotsFill/>
                    </Link>
                </div>
            </div>
            <div className="navbar-list links">
                <div className="navbar-items">
                    <Link to={"/login"}>Login</Link>
                </div>
                <div className="navbar-items">
                    <Link to={"/register"}>Register</Link>
                </div>
                <div className="navbar-items">
                    <Link to={"/manage/rooms"}>Manage</Link>
                </div>
                <div className="navbar-items">
                    <Link to={"/"}>Join</Link>
                </div>
                <div className="navbar-items">
                    <Link to={"/dashboard"}>Dashboard</Link>
                </div>
                <div className="navbar-items-mobile">
                    <AiOutlineMenu onClick={() => {dropVisible ? setDropVisible(false) : setDropVisible(true)}}/>
                </div>
            </div>
        </div>
        {dropVisible && <div className="mobile-dropdown">
            <div className="dropdown-items">
                <Link to={"/login"} onClick={() => {setDropVisible(false)}}>Login</Link>
            </div>
            <div className="dropdown-items">
                <Link to={"/register"} onClick={() => {setDropVisible(false)}}>Register</Link>
            </div>
            <div className="dropdown-items">
                <Link to={"/"} onClick={() => {setDropVisible(false)}}>Join</Link>
            </div>
            <div className="dropdown-items">
                <Link to={"/dashboard"} onClick={() => {setDropVisible(false)}}>Dashboard</Link>
            </div>
        </div>}
    </div>
}

export default NavigationBar;