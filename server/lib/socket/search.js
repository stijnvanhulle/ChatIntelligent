/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-25T10:06:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-11-25T10:34:36+01:00
* @License: stijnvanhulle.be
*/



const Status= require('../const/status');

module.exports=(users,me)=>{
  const strangers=users.filter(u=>{
    return u.socketId!==me.socketId && u.status==Status.SEARCHING;
  });

  if(strangers.length>0){
    return strangers[Math.floor(Math.random()* strangers.length)];
  }else{
    return false;
  }
};
