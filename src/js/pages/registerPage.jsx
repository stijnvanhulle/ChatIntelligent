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
        <RegisterForm handleChange={this.onUserChange} handleSave={this.addUser} user={this.state.user} errors={this.state.errors} saving={this.state.saving} />
      </div>
    );
  }
}

//const mapStateToProps = (mapState, ownProps) => {
const mapStateToProps = mapState => {
  return {users: mapState.users, friends: mapState.friends};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

RegisterPage.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
