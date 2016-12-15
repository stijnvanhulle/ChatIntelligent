/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-25T10:23:14+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-11-25T10:34:55+01:00
* @License: stijnvanhulle.be
*/



const Status=require('../const/status');

module.exports=(users,socketId)=>{
  return users.map(u=>{
    if(u.paired==socketId){
      u.status=Status.SEARCHING;
      u.paired='';
    }

    return u;
  });
};
