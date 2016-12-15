/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-10-13T18:09:11+02:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T12:35:38+01:00
* @License: stijnvanhulle.be
*/
const EventEmitter = require('events');
const {Friend: Model} = require('./mongo');

class Emitter extends EventEmitter {}

class Friend {
  constructor(user1, user2) {
    try {
      this.load({user1, user2});
    } catch (e) {
      console.log(e);
    }

    this.reset();
  }

  reset() {
    this.model = Model;
    this.date = null;
    this.isConfirmed = false;
    this.events = new Emitter();
  }

  load({user1, user2, date, isConfirmed}) {
    try {
      this.user1 = user1
        ? parseFloat(user1)
        : this.user1;
      this.user2 = user2
        ? parseFloat(user2)
        : this.user2;
      this.date = date
        ? date
        : this.date;
      this.isConfirmed = isConfirmed
        ? isConfirmed
        : this.isConfirmed;

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
      return JSON.parse(JSON.stringify(json));
    } catch (e) {
      console.log(e);
      json = JSON.stringify({});
    }
  }

}

module.exports = Friend;
