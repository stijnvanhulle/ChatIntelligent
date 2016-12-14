/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-28T14:54:43+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T21:09:00+01:00
* @License: stijnvanhulle.be
*/
const {calculateId} = require('./lib/functions');

const {User, Friend} = require('../models');
const {User: UserModel, Friend: FriendModel} = require('../models/mongo');

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    try {
      if (!id)
        reject('No id for user');

      UserModel.findOne({id: id}).exec(function(err, doc) {
        if (err) {
          reject(err);
        } else {
          let user = new User();
          user.load(doc);
          resolve(user);
        }
      });

    } catch (e) {
      console.log(e);
      reject(e);
    }

  });

};

const getUserWithPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      if (!username || !password)
        reject('No username for user');

      UserModel.findOne({username: username, password: password}).exec(function(err, doc) {
        if (err) {
          reject(err);
        } else {
          let user = new User();
          user.load(doc);
          resolve(user);
        }
      });

    } catch (e) {
      console.log(e);
      reject(e);
    }

  });

};

const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      if (!username || !password) {
        reject('no username or password');
      }
      getUserWithPassword(username, password).then(user => {
        user.setOnline(true);
        UserModel.update({
          id: user.id
        }, user.json(stringify = false, removeEmpty = true), {
          multi: true
        }, function(err, raw) {
          if (err) {
            reject(err);
          } else {
            resolve(raw);
          }
        });
      }).catch(err => {
        reject(err);
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }

  });
};

const logoffUser = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      if (!userId ) {
        reject('no userId');
      }
      getUser(userId).then(user => {
        user.setOnline(false);
        UserModel.update({
          id: user.id
        }, user.json(stringify = false, removeEmpty = true), {
          multi: true
        }, function(err, raw) {
          if (err) {
            reject(err);
          } else {
            resolve(raw);
          }
        });
      }).catch(err => {
        reject(err);
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }

  });
};

module.exports.loginUser = loginUser;
module.exports.logoffUser = logoffUser;
