/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T14:19:52+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import TextInput from '../common/textInput';

const LoginForm = ({user, handleSave, handleChange, saving, errors}) => {
  return (
    <form>
      <h1>Login</h1>
      <TextInput name='username' required={true} label='username' value={user.username
        ? user.username
        : ``} handleChange={handleChange} error={errors.username} />

      <TextInput type='password' required={true} name='password' label='password' value={user.password
        ? user.password
        : ``} handleChange={handleChange} error={errors.password} />

      <a href='/register'>Register</a>

      <input type='submit' disabled={saving} value={saving
        ? `Loging in...`
        : `Login`} className='btn btn-primary' onClick={handleSave} />
    </form>
  );
};

LoginForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  handleSave: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;
