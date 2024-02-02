require('dotenv').config();

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(join(__dirname, '..', 'public')));

io.on('connection', socket => {
  console.log('User: ', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
})

server.listen(PORT, () => {
  console.log('server running at http://localhost:3000');
});