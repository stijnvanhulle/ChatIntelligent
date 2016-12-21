/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-15T15:13:22+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T00:20:36+01:00
* @License: stijnvanhulle.be
*/
import EventEmitter from 'events';

class Emitter extends EventEmitter {}

const url = `https://chatintelligent.herokuapp.com`;
const global = {
  socket: {},
  events: new Emitter(),
  url: url
};

module.exports = global;
