/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T19:55:16+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T17:15:17+01:00
* @License: stijnvanhulle.be
*/

/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-03T14:00:47+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T17:15:17+01:00
* @License: stijnvanhulle.be
*/

import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import LoginForm from '../components/forms/loginForm';
import Message from '../components/Message';
import url from '../actions/lib/url';
class LoginPage extends Component {
  state = {
    user: {},
    errors: {},
    saving: false,
    errorText: ``
  }
  constructor(props, context) {
    super(props, context);
  }
  onLoginUser = e => {
    e.preventDefault();
    this.setState({errorText: ``});
    console.log(`login ${this.state.user}`);
    //login
    let user = this.state.user;
    if (user.username && user.password) {
      axios.post(url.LOGIN, {
        username: user.username,
        password: user.password
      }).then(response => {
        const data = response.data;
        user = data;
        if (user.id) {
          console.log(`login`, data);
          localStorage.setItem(`userId`, user.id);
          this.setState({errorText: ``});
          this.props.router.push(`/`);
        }

      }).catch(err => {
        this.setState({errorText: `Cannot login with this user, check password or username`});
        console.log(err);
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
    if (this.state.errors.length > 0 || this.state.errorText) {
      let text = `Something not correct`;
      if (this.state.errorText) {

        text = this.state.errorText;
      }

      return (
        <div>
          <Message text={text} />
          <LoginForm handleChange={this.onUserChange} handleSave={this.onLoginUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
        </div>
      );

    } else {
      return (
        <div>
          <LoginForm handleChange={this.onUserChange} handleSave={this.onLoginUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
        </div>
      );
    }

  }
}

//const mapStateToProps = (mapState, ownProps) => {
const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

LoginPage.propTypes = {
  actions: React.PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
