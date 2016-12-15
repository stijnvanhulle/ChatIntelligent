/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T16:05:16+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T11:21:02+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import {HomePage, NotFound, RegisterPage, LoginPage, FriendsPage} from './pages';

export default(
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/friends' component={FriendsPage} />
    <Route path='*' component={NotFound} />
  </Route>
);
