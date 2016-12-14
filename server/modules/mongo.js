/**
 * @Author: Stijn Van Hulle <stijnvanhulle>
 * @Date:   2016-11-08T17:36:33+01:00
 * @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T15:50:28+01:00
 * @License: stijnvanhulle.be
 */
const mongoose = require("mongoose");
const {User: UserModel, Friends: FriendsModel} = require('../models/mongo');
const {User, Friend} = require('../models');
const {calculateId, removeDataFromModel} = require('../controllers/lib/functions');

const {promiseFor} = require('../lib/functions');

const loadDefaults = () => {

  removeDataFromModel(UserModel, FriendsModel).then(item => {
    console.log('GameData reset');
  }).catch(err => {
    console.log(err);
  });
};

module.exports.register = (server, options, next) => {
  var db = mongoose.connection;
  db.on('error', (err) => {
    console.log(err);
    next(err);
  });
  db.once('open', () => {
    console.log('Mongo connected');
    loadDefaults();
    next();
  });

};

module.exports.register.attributes = {
  name: `mongo`,
  version: `0.1.0`
};
