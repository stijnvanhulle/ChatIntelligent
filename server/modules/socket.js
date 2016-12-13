/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T14:48:19+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-13T21:34:54+01:00
* @License: stijnvanhulle.be
*/

const Status = require('../lib/const/status');
const {search, linkStranger, cleanPaired} = require('../lib/socket');

const global = require('../lib/const/global');
const socketNames = require('../lib/const/socketNames');
let users = [];

const onMessageSocket = (io, socket, me) => {
  socket.on(socketNames.ONLINE, obj => {});

  socket.on(socketNames.DISCONNECT, () => {
    const {id: socketId} = socket;
    users = users.filter(c => c.socketId !== socketId);
    users = cleanPaired(users, me)
    console.log('Users:', users.length, " ", users);

  });

  socket.on('search', () => {
    const stranger = search(users, me);
    if (stranger) {
      me.status = Status.PAIRED;
      me.paired = stranger.socketId;
      users = linkStranger(users, me);
      socket.emit('found', stranger.socketId);
    }
    console.log('Users:', users.length, " ", users);
  });

};

module.exports.register = (server, options, next) => {
  users = [];
  const io = require(`socket.io`)(server.listener);
  server.expose('io', io);
  if (!io) {
    next('No io made');
    return;
  }
  global.io = io;
  users = [];

  io.on(socketNames.CONNECT, socket => {
    const {id: socketId} = socket;
    const me = {
      socketId,
      status: Status.SEARCHING
    };
    users.push(me);
    console.log('Users:', users.length, " ", users);
    onMessageSocket(io, socket, me);
  });

  next();
};

module.exports.register.attributes = {
  name: `socket`,
  version: `0.1.0`
};
