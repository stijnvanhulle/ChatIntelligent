/**
 * @Author: Stijn Van Hulle <stijnvanhulle>
 * @Date:   2016-11-08T16:04:53+01:00
 * @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-19T21:21:58+01:00
 * @License: stijnvanhulle.be
 */

const url = require('./lib/url');
const moment = require('moment');
const {User, Friend} = require('../../models');
const {promiseFor} = require('../../lib/functions');

module.exports = [
  {
    method: `GET`,
    path: url.FRIEND,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let userId = request.params.id;

        userController.getFriends(userId).then((friends) => {
          reply(friends);
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
    path: url.FRIEND,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let userId = request.params.id;
        let {friendId} = request.payload;
        const friend = new Friend(userId, friendId);
        console.log(friend);

        userController.addFriend(friend).then((doc) => {
          friend.date = doc.date;
          reply(friend.json(stringify = false, removeEmpty = true));
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
    path: url.FRIEND_ACCEPT,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let userId = request.params.id;
        let {friendId} = request.payload;

        userController.acceptFriend(userId, friendId).then((doc) => {
          return userController.getFriend(userId, friendId);
        }).then(user => {
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

  }
];
