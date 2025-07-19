const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', socket => {
  console.log('a user connected:', socket.id);

  socket.on('offer', data => {
    console.log('Received offer from:', socket.id);
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', data => {
    console.log('Received answer from:', socket.id);
    socket.broadcast.emit('answer', data);
  });

  socket.on('ice-candidate', data => {
    console.log('Received ICE candidate from:', socket.id);
    socket.broadcast.emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Signaling server listening on http://192.168.1.106:3000');
});