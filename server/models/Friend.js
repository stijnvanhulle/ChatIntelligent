/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-10-13T18:09:11+02:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T16:22:27+01:00
* @License: stijnvanhulle.be
*/
const EventEmitter = require('events');
const {Friend: Model} = require('./mongo');

class Emitter extends EventEmitter {}

class Friend {
  constructor(user1, user2) {
    this.load({user1, user2});
    this.reset();
  }

  reset() {
    this.id = null;
    this.model = Model;
    this.date = null;
    this.isActivated = false;
    this.events = new Emitter();
  }

  load({user1, user2, date, id, isActivated}) {
    try {
      this.user1 = user1
        ? parseFloat(user1)
        : this.user1;
      this.user2 = user2
        ? parseFloat(user2)
        : this.user2;
      this.id = id
        ? id
        : this.id;
      this.date = date
        ? date
        : this.date;
      this.isActivated = isActivated
        ? isActivated
        : this.isActivated;

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

module.exports = Friend;
