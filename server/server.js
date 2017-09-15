const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); //to extend capabilities of the server to allow for socket connections
var io = socketIO(server);

app.use(express.static(publicPath)); //location of files we will read from

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        message.createdAt = new Date().getTime();
        console.log('createMessage', message);
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt:message.createdAt
        }); //emits event to every single connection

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // }); //sends to everyone except for the person who triggered event

    });

    socket.on('disconnect', () => { console.log("Client Disconnected");});

}); //register an event listener, in this case incoming connections


server.listen(port,() => {
    console.log(`Server is up on port ${port}`)
});