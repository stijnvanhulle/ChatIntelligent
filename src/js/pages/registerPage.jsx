/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-15T12:54:08+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T17:16:37+01:00
* @License: stijnvanhulle.be
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import RegisterForm from '../components/forms/registerForm';
import global from '../lib/const/global';
import eventNames from '../lib/const/eventNames';
import Message from '../components/Message';
import url from '../actions/lib/url';
import axios from 'axios';
class RegisterPage extends Component {
  state = {
    user: {},
    errors: {},
    saving: false,
    errorText: ``
  }
  constructor(props, context) {
    super(props, context);
  }
  onAddUser = e => {
    e.preventDefault();
    console.log(`saving ${this.state.user}`);
    this.props.actions.createUser(this.state.user).then(() => {

      this.login(this.state.user.username, this.state.user.password);

    }).catch(err => {
      //show message cannot register
      console.log(err);
    });

  }
  login = (username, password) => {
    let user;
    this.setState({errorText: ``});
    axios.post(url.LOGIN, {
      username: username,
      password: password
    }).then(response => {
      const data = response.data;
      user = data;
      if (user.id) {
        console.log(`login`, data);
        localStorage.setItem(`userId`, user.id);
        this.setState({user: {}});

        this.setState({errorText: ``});
        global.events.emit(eventNames.LOGIN, true);
        this.props.router.push(`/`);
      }

    }).catch(err => {
      this.setState({errorText: `Cannot register with this user, check data`});
      console.log(err);
    });
  }
  onUserChange = e => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value.toString();

    if (field === `password` || field === `passwordRepeat`) {
      if (user[`password`] && user[`passwordRepeat`]) {
        const errors = this.state.errors;
        if (user[`password`] !== user[`passwordRepeat`]) {
          errors.password = `Password not the same`;
          this.setState({errors});
        } else {
          errors.password = null;
          this.setState({errors});
        }
      }
    }

    return this.setState({user: user});
  }

  render() {
    if (this.state.errors.length > 0 || this.state.errorText) {
      let text = `Something not correct`;
      if (this.state.errorText) {

        text = this.state.errorText;
      }

      return (
        <div>
          <Message text={text} />
          <RegisterForm handleChange={this.onUserChange} handleSave={this.onAddUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
        </div>
      );

    } else {
      return (
        <div>
          <RegisterForm handleChange={this.onUserChange} handleSave={this.onAddUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
        </div>
      );
    }

  }
}

const mapStateToProps = mapState => {
  return {users: mapState.users, friends: mapState.friends};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

RegisterPage.propTypes = {
  actions: React.PropTypes.object

};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
