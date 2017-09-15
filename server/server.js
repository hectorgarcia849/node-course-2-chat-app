const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); //to extend capabilities of the server to allow for socket connections
var io = socketIO(server);

app.use(express.static(publicPath)); //location of files we will read from

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text)); //emits event to every single connection

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