/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:35:26+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T20:02:59+01:00
* @License: stijnvanhulle.be
*/

import axios from 'axios';
import {setUrl} from '../lib/functions';
import _url from './lib/url';
import actionsUrl from './lib/actionsUrl';

const url = setUrl(_url);

export function createUserSuccess(user) {
  return {type: actionsUrl.CREATE_USER_SUCCESS, user};
}

export function loadUsersSuccess(users) {
  return {type: actionsUrl.LOAD_USERS_SUCCESS, users};
}

//thunk
//
export function createUser(user) {
  return dispatch => {
    try {
      return axios.post(url.USER, user).then(response => {
        const data = response.data;
        dispatch(createUserSuccess(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}

export function loadUsers(query = ``) {
  return dispatch => {
    try {
      return axios.get(`${url.USER  }?query=${  query}`).then(response => {
        const data = response.data;
        dispatch(loadUsersSuccess(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}
