/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-25T10:17:39+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-11-25T10:21:39+01:00
* @License: stijnvanhulle.be
*/
const Status= require('../const/status');


module.exports=(users,me)=>{
  return users.map(u=>{
    if(u.socketId==me.paired){
      u.status=Status.PAIRED;
      u.paired=me.socketId;

    }
    return u;
  });
};
