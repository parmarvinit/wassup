const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 1129 ;


http.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,resp)=>{
    resp.sendFile(__dirname + '/index.html');
});

 
//socket

const io = require('socket.io')(http);
io.on('connection',(socket) => {
    console.log("connected...")
socket.on('disconnect',() =>{
    console.log("disconnected..");
    })
socket.on('message',(msg) => {
    socket.broadcast.emit('message',msg)
    })
});
