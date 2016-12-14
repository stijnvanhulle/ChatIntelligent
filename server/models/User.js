/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-10-13T18:09:11+02:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:41:53+01:00
* @License: stijnvanhulle.be
*/
const EventEmitter = require('events');
const {User: Model} = require('./mongo');

class Emitter extends EventEmitter {}

class User {
  constructor({firstName, lastName, username, email, password}) {
    try {
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.password = password;
      this.email = email;
    } catch (e) {
      console.log(e);
    }

    this.reset();

  }

  setOnline(online) {
    this.online = online;
  }

  encrypPassword() {
    this.password = this.password;
  }

  reset() {
    this.id = null;
    this.model = Model;
    this.date = null;
    this.online = false;
    this.events = new Emitter();
  }

  load({
    firstName,
    lastName,
    password,
    date,
    id,
    username,
    email,
    online
  }) {
    try {
      this.firstName = firstName
        ? firstName
        : this.firstName;
      this.lastName = lastName
        ? lastName
        : this.lastName;
      this.id = id
        ? id
        : this.id;
      this.username = username
        ? username
        : this.username;
      this.email = email
        ? email
        : this.email;
      this.date = date
        ? date
        : this.date;
      this.online = online
        ? Boolean(online)
        : this.online;
      this.password = password
        ? password
        : this.password;

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  save() {
    return new Promise((resolve, reject) => {
      try {
        const item = this.json(false);
        const obj = new Model(item);
        console.log('Will save: ', obj);

        obj.save(function(err, item) {
          if (err) {
            reject(err);
          } else {
            resolve(item);
          }
        });
      } catch (e) {
        reject(e);
      }

    });
  }

  json(stringify = true, removeEmpty = false) {
    var json;
    try {
      var obj = this;
      var copy = Object.assign({}, obj);
      copy.events = null;
      copy.model = null;
      if (stringify) {
        json = JSON.stringify(copy);
      } else {
        json = copy;
      }

      if (removeEmpty) {
        const keys = Object.keys(json);
        for (var i = 0; i < keys.length; i++) {
          let key = keys[i];
          if (json[key] == null) {
            json[key] = undefined;
          }
        }
        json['_id'] = undefined;
        json['__v'] = undefined;
      }
    } catch (e) {
      console.log(e);
      json = JSON.stringify({});
    } finally {
      return json;
    }
  }

}

module.exports = User;
