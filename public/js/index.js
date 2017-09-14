var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to: "jen",
        text: "Hey, wuddup?",
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(email) {
    console.log('New Email');
    console.log(email);
});
