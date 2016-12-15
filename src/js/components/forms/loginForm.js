/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T14:36:53+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import TextInput from '../common/textInput';

const LoginForm = ({user, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Login</h1>
      <TextInput name='username' label='username' value={user.username ? user.username : ``} onChange={onChange} error={errors.username} />

      <TextInput name='password' label='password' value={user.password ? user.password : ``} onChange={onChange} error={errors.password} />

      <input type='submit' disabled={saving} value={saving
        ? `Saving...`
        : `Save`} className='btn btn-primary' onClick={onSave} />
    </form>
  );
};

LoginForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;
