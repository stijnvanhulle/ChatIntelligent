/**
 * @Author: Stijn Van Hulle <stijnvanhulle>
 * @Date:   2016-11-08T16:04:53+01:00
 * @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T21:42:34+01:00
 * @License: stijnvanhulle.be
 */

const url = require('./lib/url');
const moment = require('moment');
const {User, Friend} = require('../../models');
const {promiseFor} = require('../../lib/functions');

module.exports = [
  {
    method: `POST`,
    path: url.FRIEND,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let {userId1, userId2} = request.payload;
        const friend = new Friend(userId1, userId2);

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
    method: `GET`,
    path: url.FRIEND_ACCEPT,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let {userId1, userId2} = request.payload;

        userController.acceptFriend(userId1, userId2).then((doc) => {
          reply(doc);
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
