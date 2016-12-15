/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T16:26:56+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:53:01+01:00
* @License: stijnvanhulle.be
*/

const API = `/api`;
export default {
  DEFAULT: `${API}/`,
  LOGIN: `${API  }/login`,
  LOGOFF: `${API  }/logoff`,
  USER: `${API}/user`,
  USER_ONLINE: `${API}/user/online`,
  USER_GET: `${API}/user` + `/{id}/`,
  USER_UPDATE: `${API}/user` + `/{id}/update`,
  FRIEND: `${API}/friend`,
  FRIEND_ACCEPT: `${API}/friend/accept`
};
