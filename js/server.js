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
});
http.listen(3005, () => {
    console.log('listening on port 3005');
});
//# sourceMappingURL=server.js.map