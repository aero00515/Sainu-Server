var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected', socket.id);
  socket.on('tweet', function(tweet) {
    console.log(tweet, socket.id);
    io.emit('tweet', tweet);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnect', socket.id);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
