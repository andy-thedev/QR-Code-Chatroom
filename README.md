# QR Code Restaurant Chat Application
This project demonstrates a real-time chat web application that allows customers to scan a QR code at their table to chat with the admin.

Utilizes *Socket.IO* with the *MERN (MongoDB, Express, React, Node) stack.*

Front-end: ReactJS, HTML, CSS, Redux, Socket.IO(client)  
Back-end: NodeJS, ExpressJS, Socket.IO  
Database: MongoDB  
Version Control: Git Bash

## /client/src
**/screens:**  
The visual implementations of pages, such as the login screen, and dashboard screen

**/components:**  
Potentially reuseable visual parts of a screen, such as a message, and info bar

**App.js:**  
The main container component for all other components, such as screens

## /server
**/models:**  
The data model describing the shape and structure of saving documents, such as chatroom/admin information

**/routes:**  
The routes that dictate the operation associated with an HTTP verb, such as POST chatroom

**server.js:**  
The configurations of the server utilized by the web application. ie: connections to routes, websocket, the database etc.

**config.js:**  
Contains commonly used variables in the backend parts of the web application (ie: Database URL in a dotenv file)

**util.js:**  
Contains utility functions, such as middlewares, and tokenization functions

## Features
**Feature 1:**  
Admin login controlled by JWT authentication.  
User information is tokenized and verified with the database to safely record, and match login information.  
Only logged in users (admins) can create/edit chatrooms, or access the dashboard.

**Feature 2:**  
Non-admin users do not need to login to utilize the service. Average users may simply scan a QR code to enter the respective chatroom.  
This chatroom is connected to an admin's dashboard, where the admin may read, and reply to messages sent by the user (Feature 3).

**Feature 3:**  
Logged in admins can access the dashboard, showing an overview of all chatrooms associated with their account.  
Admins(ie: restaurant owners) may select individual chatrooms(ie: tables) on the dashboard to read, and reply to messages sent by users(ie: customers)

(The application architecture was designed to maximize user-friendliness and minimize barrier to entry)
