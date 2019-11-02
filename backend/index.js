const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const socketRoutes = require('./routes/socket');
const config = require('./config.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(apiRoutes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  }
  next()
});

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', socketRoutes);

server.listen(config.port, config.ip, () => {
  console.log(`Server running on port ${config.port}`);
});
