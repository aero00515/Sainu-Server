const _ = require('underscore');

module.exports = (io, store) => {
  io.on('connection', function(socket) {
    console.log('a user connected', socket.id);
    // TODO: get data from db
    store.sainuers[socket.id] = {};
    // TODO: if exist, send back to user and redirect page

    socket.on('setName', function(name) {
      store.sainuers[socket.id] = _.extend(
        store.sainuers[socket.id],
        {
          name
        },
        {}
      );
    });

    socket.on('tweet', function(tweet) {
      console.log(tweet, store.sainuers[socket.id]);
      store.sainuers[socket.id] = _.extend(
        store.sainuers[socket.id],
        {
          lastMessage: tweet
        },
        {}
      );
      io.emit('tweet', tweet);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnect', socket.id);
    });
  });
};
