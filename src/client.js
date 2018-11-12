const _ = require('underscore');

module.exports = (io, store) => {
  io.on('connection', function(socket) {
    console.log('a user connected', socket.id);
    // TODO: get data from db
    store.sainuers[socket.id] = {};
    // TODO: if exist, send back to user and redirect page
    // socket.emit('name', name);

    socket.on('setSaiNuer', function(name) {
      store.sainuers[socket.id] = _.extend(
        store.sainuers[socket.id],
        {
          name
        },
        {}
      );
      socket.emit('setSaiNuer', name);
      console.log(name, store.sainuers[socket.id]);
    });

    socket.on('tweet', function(tweet) {
      store.sainuers[socket.id] = _.extend(
        store.sainuers[socket.id],
        {
          lastMessage: tweet
        },
        {}
      );
      // Broadcast
      io.emit('tweet', tweet);
      console.log(tweet, store.sainuers[socket.id]);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnect', socket.id);
    });
  });
};
