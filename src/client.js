const _ = require('underscore');

module.exports = (io, store) => {
  io.on('connection', function(socket) {
    console.log('a user connected', socket.id);
    // TODO: get data from db
    store.senuers[socket.id] = {};
    // TODO: if exist, send back to user and redirect page
    // socket.emit('name', name);

    socket.on('setSenuer', function(name) {
      store.senuers[socket.id] = _.extend(
        store.senuers[socket.id],
        {
          name
        },
        {}
      );
      socket.emit('setSenuer', name);
      console.log(name, store.senuers[socket.id]);
    });

    socket.on('tweet', function(tweet) {
      store.senuers[socket.id] = _.extend(
        store.senuers[socket.id],
        {
          lastMessage: tweet
        },
        {}
      );
      // Broadcast
      io.emit('tweet', tweet);
      console.log(tweet, store.senuers[socket.id]);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnect', socket.id);
    });
  });
};
