/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:31:11+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-09T15:31:19+01:00
* @License: stijnvanhulle.be
*/



import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const middlewares = applyMiddleware(thunk, reduxImmutableStateInvariant());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middlewares);
}
