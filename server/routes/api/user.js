/**
 * @Author: Stijn Van Hulle <stijnvanhulle>
 * @Date:   2016-11-08T16:04:53+01:00
 * @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-17T15:28:59+01:00
 * @License: stijnvanhulle.be
 */

const url = require('./lib/url');
const moment = require('moment');
const {User, Friend} = require('../../models');
const {promiseFor} = require('../../lib/functions');

module.exports = [
  {
    method: `GET`,
    path: url.USER_ONLINE,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let userId = request.params.id;

        userController.getUser(userId).then((user) => {
          if (user.online) {
            reply({online: true});
          } else {
            reply({online: false});
          }
        }).catch(err => {
          console.log(err);
          reply(new Error(err));
        });
      } catch (e) {
        console.log(e);
        reply(e);
      }

    }

  }, {
    method: `GET`,
    path: url.USER,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        const username = request.query.username;

        userController.getUserByUsername(username).then((user) => {
          reply(user);
        }).catch(err => {
          console.log(err);
          reply(new Error(err));
        });
      } catch (e) {
        console.log(e);
        reply(e);
      }

    }

  }, {
    method: `POST`,
    path: url.USER,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        const user = new User();
        user.load(request.payload);
        user.encrypPassword();
        userController.addUser(user).then((doc) => {
          user.id = doc.id;
          user.date = doc.date;
          reply(user.json(stringify = false, removeEmpty = true));
        }).catch(err => {
          console.log(err);
          reply(new Error(err));
        });
      } catch (e) {
        console.log(e);
        reply(e);
      }

    }

  }, {
    method: `GET`,
    path: url.USER_GET,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let userId = request.params.id;

        userController.getUser(userId).then((user) => {
          reply(user.json(stringify = false, removeEmpty = true));
        }).catch(err => {
          console.log(err);
          reply(new Error(err));
        });
      } catch (e) {
        console.log(e);
        reply(e);
      }

    }

  }, {
    method: `GET`,
    path: url.USERS_ONLINE,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        userController.getOnlineUsers().then((users) => {
          reply(users);
        }).catch(err => {
          console.log(err);
          reply(new Error(err));
        });
      } catch (e) {
        console.log(e);
        reply(e);
      }

    }

  }, {
    method: `POST`,
    path: url.USER_UPDATE,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        const user = new User();
        user.load(request.payload);

        userController.updateUser(user).then((doc) => {
          reply(user.json(stringify = false, removeEmpty = true));
        }).catch(err => {
          console.log(err);
          reply(new Error(err));
        });
      } catch (e) {
        console.log(e);
        reply(e);
      }

    }

  }
];
