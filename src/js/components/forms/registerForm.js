/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:05:15+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import TextInput from '../common/textInput';

const RegisterForm = ({user, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Registeer</h1>
      <TextInput name='firstName' label='firstName' value={user.firstName ? user.firstName : ``} onChange={onChange} error={errors.firstName} />

      <TextInput name='lastName' label='lastName' value={user.lastName ? user.lastName : ``} onChange={onChange} error={errors.lastName} />

      <TextInput name='username' label='username' value={user.username ? user.username : ``} onChange={onChange} error={errors.username} />

      <TextInput name='email' label='email' value={user.email ? user.email : ``} onChange={onChange} error={errors.email} />

      <input type='submit' disabled={saving} value={saving
        ? `Saving...`
        : `Save`} className='btn btn-primary' onClick={onSave} />
    </form>
  );
};

RegisterForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default RegisterForm;
