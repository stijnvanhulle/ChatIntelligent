/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:35:26+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T19:53:58+01:00
* @License: stijnvanhulle.be
*/

import axios from 'axios';
import url from './lib/url';
import actionsUrl from './lib/actionsUrl';

export function createUser_SUCCESS(user) {
  return {type: actionsUrl.ADD_USER, user};
}

//thunk
//
export function createUser(user) {
  return dispatch => {
    try {
      return axios.post(url.USER, user).then(response => {
        const data = response.data;
        dispatch(createUser_SUCCESS(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}
