/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T19:55:16+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:55:33+01:00
* @License: stijnvanhulle.be
*/

/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-03T14:00:47+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:55:33+01:00
* @License: stijnvanhulle.be
*/

import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import LoginForm from '../components/forms/loginForm';
class LoginPage extends Component {
  state = {
    user: {},
    errors: {},
    saving: false
  }
  constructor(props, context) {
    super(props, context);
  }
  loginUser = e => {
    e.preventDefault();
    console.log(`login ${this.state.user}`);
    //login
    const user = this.state.user;
    if (user.username && user.password) {
      axios.get(url.LOGIN, {
        username: user.username,
        password: user.password
      }).then(response => {
        const data = response.data;
        localStorage.setItem(`userId`, user.id);
        console.log(`login`, data);
      }).catch(err => {
        throw err;
      });
    }

  }
  onUserChange = e => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value.toString();

    return this.setState({user: user});
  }

  render() {
    return (
      <div>
        <LoginForm onChange={this.onUserChange} onSave={this.loginUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
      </div>
    );
  }
}

const mapStateToProps = (mapState, ownProps) => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);