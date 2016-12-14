/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T19:55:16+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T21:24:29+01:00
* @License: stijnvanhulle.be
*/

/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-03T14:00:47+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T21:24:29+01:00
* @License: stijnvanhulle.be
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import RegisterForm from '../components/forms/registerForm';
class RegisterPage extends Component {
  state = {
    user: {},
    errors: {},
    saving: false
  }
  constructor(props, context) {
    super(props, context);
  }
  addUser = e => {
    e.preventDefault();
    console.log(`saving ${this.state.user}`);
    this.props.actions.createUser(this.state.user).then(ok => {
      console.log(ok);
      this.setState({user: {}});
    }).catch(err => {
      console.log(err);
    });

  }
  onUserChange = e => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value.toString();

    if (field == `password` || field == `passwordRepeat`) {
      if (user[`password`] && user[`passwordRepeat`]) {
        const errors = this.state.errors;
        if (user[`password`] != user[`passwordRepeat`]) {
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
    return (
      <div>
        <RegisterForm onChange={this.onUserChange} onSave={this.addUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
      </div>
    );
  }
}

const mapStateToProps = (mapState, ownProps) => {
  return {users: mapState.users, friends: mapState.friends};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
