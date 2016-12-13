/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:31:57+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-09T16:09:28+01:00
* @License: stijnvanhulle.be
*/

import {combineReducers} from 'redux';
import youStream from './youStreamReducer';
import strangerStream from './strangerStreamReducer';
const rootReducer = combineReducers({youStream, strangerStream});

export default rootReducer;
