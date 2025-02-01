const express = require('express');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Node App Listening on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

let onlineUsers = [];

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    if (!socket.rooms.has(userId)) {
      socket.join(userId);

      if (!onlineUsers.includes(userId)) {
        onlineUsers.push(userId);
      }
    }

    console.log('OnlineUsers', onlineUsers);

    onlineUsers.forEach((user) => {
      io.to(user).emit('online-users-updated', onlineUsers);
    });
  });

  socket.on('logout', (userId) => {
    socket.leave(userId);
    onlineUsers = onlineUsers.filter((user) => user !== userId);

    console.log('OnlineUsers', onlineUsers);

    onlineUsers.forEach((user) => {
      io.to(user).emit('online-users-updated', onlineUsers);
    });
  });

  console.log('A user connected.');
});

app.get('/', (req, res) => {
  return res.send('This is socket io chat server');
});
