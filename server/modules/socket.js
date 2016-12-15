/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T14:48:19+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T12:10:55+01:00
* @License: stijnvanhulle.be
*/

const Status = require('../lib/const/status');
const {search, linkStranger, cleanPaired, updateMe} = require('../lib/socket');
const Chance = require('chance');
const chance = new Chance();

const global = require('../lib/const/global');
const loginController = require('../controllers/loginController');
const socketNames = require('../lib/const/socketNames');

const apiai = require('apiai');
const app = apiai("bcdae007f870445c9b1fafb0b5177bae");

let users = [];

const onMessageSocket = (io, socket, me) => {
  socket.on(socketNames.ONLINE, obj => {
    if (obj && obj.userId) {
      me.userId = obj.userId;

      if (me.userId) {
        loginController.loginUserId(me.userId).then(ok => {
          if (ok) {
            console.log('Logged on user ', me);
            updateMe(users, me);
            console.log(users);
          }
        }).catch(err => {
          console.log(err);
        });
      }

    }

  });

  socket.on(socketNames.DISCONNECT, () => {
    const {id: socketId} = socket;
    users = users.filter(c => c.socketId !== socketId);
    users = cleanPaired(users, me)
    if (me.userId) {
      loginController.logoffUser(me.userId).then(ok => {
        if (ok) {
          console.log('Logged off user ', me);
        }
      }).catch(err => {
        console.log(err);
      });
    }

    console.log('Users:', users.length, " ", users);
  });

  socket.on(socketNames.SEARCH, (obj) => {
    const stranger = search(users, me);
    if (stranger) {

      me.status = Status.PAIRED;
      me.paired = stranger.socketId;
      users = linkStranger(users, me);
      socket.emit('found', stranger.socketId);
    }
    console.log('Users:', users.length, " ", users);
  });

  socket.on(socketNames.SPEECH, (text) => {

    var request = app.textRequest(text.toString(), {
      sessionId: chance.hash({length: 15})
    });

    request.on('response', function(res) {
      console.log(res);
      if (res.result) {
        const {speech} = res.result.fulfillment;
        io.emit(socketNames.SPEECH_POST, speech);
      }

    });

    request.on('error', function(error) {
      console.log(error);
    });

    request.end();
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
