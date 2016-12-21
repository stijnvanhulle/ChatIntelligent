/**
 * @Author: Stijn Van Hulle <stijnvanhulle>
 * @Date:   2016-11-08T16:04:53+01:00
 * @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-21T14:52:50+01:00
 * @License: stijnvanhulle.be
 */

const url = require('./lib/url');
const {io} = require('../../lib/const/global');
const socketNames = require('../../lib/const/socketNames');
const moment = require('moment');
const Crypto = require("crypto-js");
const {User, Friend} = require('../../models');
const {promiseFor} = require('../../lib/functions');
const loginController = require('../../controllers/loginController');

module.exports = [
  {
    method: `POST`,
    path: url.LOGIN,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {loginController} = require('../../controllers');
      try {
        let {username, password} = request.payload;
        password = Crypto.MD5(password).toString();
        loginController.loginUser(username, password).then((doc) => {
          io.emit(socketNames.NEW_FRIEND_ACCEPTED, true);
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

  }, {
    method: `POST`,
    path: url.LOGOFF,
    config: {
      auth: false
    },
    handler: function(request, reply) {
      const {userController} = require('../../controllers');
      try {
        let {userId} = request.payload;

        loginController.logoffUser(userId).then((doc) => {
          io.emit(socketNames.NEW_FRIEND_ACCEPTED, true);
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
