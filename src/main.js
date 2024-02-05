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
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });

})

server.listen(PORT, () => {
  console.log('server running at http://localhost:3000');
});