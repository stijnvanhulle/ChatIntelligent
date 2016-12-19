/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-15T12:54:08+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-19T23:10:20+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
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
    this.props.actions.createUser(this.state.user).then(() => {
      this.setState({user: {}});
      this.props.router.push(`/`);
    }).catch(err => {
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
    return (
      <div>
        <RegisterForm onChange={this.onUserChange} onSave={this.addUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
      </div>
    );
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
