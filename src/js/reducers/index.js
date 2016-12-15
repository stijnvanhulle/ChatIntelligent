/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:31:57+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:00:22+01:00
* @License: stijnvanhulle.be
*/

import {combineReducers} from 'redux';
import youStream from './youStreamReducer';
import strangerStream from './strangerStreamReducer';
import users from './usersReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({youStream, strangerStream, users, friends});

export default rootReducer;
