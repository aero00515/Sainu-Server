const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('../config');
const client = require('./client');
const store = require('./store');

client(io, store);

http.listen(config.socket.port, function() {
  console.log(`listening on *:${config.socket.port}`);
});
