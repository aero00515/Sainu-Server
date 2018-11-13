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

    socket.on('aware', function(aware) {
      store.senuers[socket.id] = _.extend(
        store.senuers[socket.id],
        {
          lastMessage: aware
        },
        {}
      );
      store.events.push({
        senuerId: socket.id,
        senuer: store.senuers[socket.id].name,
        createdAt: Date.now(),
        aware
      });
      // Broadcast
      io.emit('aware', aware);
      console.log(socket.id, store.senuers, store.events);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnect', socket.id);
    });
  });
};
