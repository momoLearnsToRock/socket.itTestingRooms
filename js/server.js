"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
// import http = require('http');
const http = require('http').Server(app);
const sio = require("socket.io");
const io = sio(http);
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/client.html");
});
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.emit("chat message", "welcome to io!");
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
    socket.on('joinRoom', (room) => {
        socket.join(room, () => {
            console.log(`socket joined the room ${socket.rooms[room]}`);
        });
    });
});
const room1 = 'room1';
const room2 = 'room2';
let i = 0;
let j = 0;
setInterval(() => {
    io.sockets.in(room1).emit('roomMessage', `you are listening to ${room1} in sequence ${i}`);
    i++;
}, 5000);
setInterval(() => {
    io.sockets.in(room2).emit('roomMessage', `you are listening to ${room2} in sequence ${j}`);
    j++;
}, 5000);
http.listen(3005, () => {
    console.log('listening on port 3005');
});
//# sourceMappingURL=server.js.map