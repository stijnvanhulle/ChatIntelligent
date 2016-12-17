/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-28T14:54:43+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-17T15:39:46+01:00
* @License: stijnvanhulle.be
*/
const {calculateId} = require('./lib/functions');
const Crypto = require("crypto-js");
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
          if (doc) {
            let user = new User();
            user.load(doc);
            resolve(user);
          } else {
            resolve(null);
          }

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
      password = Crypto.MD5(password.toString());

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
const loginUserId = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      if (!userId) {
        reject('no userid');
      }
      let user;
      getUser(userId).then(item => {
        if (!item) {
          reject("no user found");
        }
        user = item;
        user.setOnline(true);
        user = user.json(stringify = false, removeEmpty = true);
        UserModel.update({
          id: user.id
        }, user, {
          multi: true
        }, function(err, raw) {
          if (err) {
            reject(err);
          } else {
            resolve(user);
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
const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      if (!username || !password) {
        reject('no username or password');
      }
      let user;
      getUserWithPassword(username, password).then(item => {
        user = item;
        user.setOnline(true);
        user = user.json(stringify = false, removeEmpty = true);
        UserModel.update({
          id: user.id
        }, user, {
          multi: true
        }, function(err, raw) {
          if (err) {
            reject(err);
          } else {
            resolve(user);
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
      if (!userId) {
        reject('no userId');
      }
      let user;
      getUser(userId).then(item => {
        if (!item) {
          reject("no user found");
        }
        user = item;
        user.setOnline(false);
        UserModel.update({
          id: user.id
        }, user.json(stringify = false, removeEmpty = true), {
          multi: true
        }, function(err, raw) {
          if (err) {
            reject(err);
          } else {
            resolve(user);
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
module.exports.loginUserId = loginUserId;
module.exports.logoffUser = logoffUser;
