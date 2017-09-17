const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); //to extend capabilities of the server to allow for socket connections
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath)); //location of files we will read from

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id); //make sure that there is no user already with that socket id attached to any other room, or this room.  This keeps one connection open with this socket-id.
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();

    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); //emits event to every single connection
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log("Client Disconnected");

        var user = users.removeUser(socket.id);
        if (user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

}); //register an event listener, in this case incoming connections


server.listen(port,() => {
    console.log(`Server is up on port ${port}`)
});