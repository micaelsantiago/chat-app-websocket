require('dotenv').config();

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

server.listen(PORT, () => {
  console.log('server running at http://localhost:3000');
});