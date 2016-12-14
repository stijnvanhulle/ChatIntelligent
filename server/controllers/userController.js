/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-28T14:54:43+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T21:23:10+01:00
* @License: stijnvanhulle.be
*/
const {calculateId} = require('./lib/functions');

const {User, Friend} = require('../models');
const {User: UserModel, Friend: FriendModel} = require('../models/mongo');

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    try {
      if (!username)
        reject('No username for user');

      UserModel.find({username: username}).exec(function(err, docs) {
        if (err) {
          reject(err);
        } else {
          let users = docs.map((item) => {
            let user = new User();
            user.load(item);
            return user;
          });
          resolve(users);
        }
      });

    } catch (e) {
      console.log(e);
      reject(e);
    }

  });

};

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    try {
      if (!id)
        reject('No id for user');

      UserModel.findOne({id: id}).exec(function(err, doc) {
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

const getOnlineUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      if (!id)
        reject('No id for user');

      UserModel.find({online: true}).exec(function(err, docs) {
        if (err) {
          reject(err);
        } else {
          let users = docs.map((item) => {
            let user = new User();
            user.load(item);
            return user;
          });
          resolve(users);
        }
      });

    } catch (e) {
      console.log(e);
      reject(e);
    }

  });

};

module.exports.addUser = (user) => {
  return new Promise((resolve, reject) => {
    try {
      if (!user instanceof User) {
        throw new Error('No instance of');
      }
      getUserByUsername(user.username).then(users => {
        if (users && users.length > 0) {
          reject('Username already taken');
        } else {
          calculateId(UserModel).then(id => {
            user.id = id;
            user.save().then((doc) => {
              resolve(doc);
            }).catch(err => {
              reject(err);
            });
          });
        }
      }).catch(err => {
        reject(err);
      })

    } catch (e) {
      console.log(e);
      reject(e);
    }

  });

};

module.exports.addFriend = (friend) => {
  return new Promise((resolve, reject) => {
    try {
      if (!friend instanceof Friend) {
        throw new Error('No friend');
      }

      calculateId(FriendModel).then(id => {
        friend.id = id;
        friend.save().then((doc) => {
          resolve(doc);
        }).catch(err => {
          reject(err);
        });
      });

    } catch (e) {
      console.log(e);
      reject(e);
    }

  });

};

const updateFriend = (userId1, userId2) => {
  return new Promise((resolve, reject) => {
    try {
      FriendModel.update({
        user1: userId1,
        user2: userId2
      }, {
        isActivated: true
      }, {
        multi: true
      }, function(err, raw) {
        if (err) {
          reject(err);
        } else {
          resolve(raw);
        }
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }

  });
};

const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    try {
      if (!user instanceof User) {
        reject('no user instance');
      }
      UserModel.update({
        id: user.id
      }, user.json(stringify = false, removeEmpty = true), {
        multi: true
      }, function(err, raw) {
        if (err) {
          reject(err);
        } else {
          resolve(raw);
        }
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }

  });
};

module.exports.acceptFriend = (userId1, userId2) => {
  return new Promise((resolve, reject) => {
    try {
      if (!userId1 || !userId1) {
        throw new Error('No users');
      }
      let user1,
        user2;
      getUser(userId1).then(item => {
        user1 = item;
        return getUser(userId2);
      }).then(item => {
        user2 = item;
        if (user1 && user2) {
          return updateFriend(user1.id, user2.id);
        } else {
          reject('somehting wrong with user1 and user2');
        }

      }).then(doc => {
        if (doc) {
          return updateFriend(user2.id, user1.id);
        } else {
          reject('somehting wrong with user1');
        }
      }).catch(err => {
        reject(err);
      });

    } catch (e) {
      console.log(e);
      reject(e);
    }

  });
};

module.exports.getUser = getUser;
module.exports.getOnlineUsers = getOnlineUsers;
module.exports.updateUser = updateUser;
