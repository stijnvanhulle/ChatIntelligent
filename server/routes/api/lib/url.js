/**
 * @Author: Stijn Van Hulle <stijnvanhulle>
 * @Date:   2016-11-08T16:24:33+01:00
 * @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T11:42:28+01:00
 * @License: stijnvanhulle.be
 */

const API = '/api'
module.exports = {
  DEFAULT: API + '/',
  LOGIN: API + '/login',
  LOGOFF: API + '/logoff',
  USER: API + '/user',
  USERS_ONLINE: API + '/user/online',
  USER_ONLINE:  API + '/user' + '/{id}/online',
  USER_GET: API + '/user' + '/{id}/',
  USER_UPDATE: API + '/user' + '/{id}/update',
  FRIEND: API + '/user' + '/{id}/friend',
  FRIEND_ACCEPT: API + '/user' + '/{id}/friend/accept'
};
