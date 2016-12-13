/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T16:05:16+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-09T16:53:21+01:00
* @License: stijnvanhulle.be
*/



import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';


export default(
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='*' component={NotFound} />
  </Route>
);
