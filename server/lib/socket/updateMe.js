/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-25T10:17:39+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T21:56:03+01:00
* @License: stijnvanhulle.be
*/
const Status = require('../const/status');

module.exports = (users, me) => {
  return users.map(u => {
    if (u.socketId == me.socketId) {
      u = me;
    }
    return u;
  });
};
