/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-21T14:29:18+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import TextInput from '../common/textInput';

const RegisterForm = ({user, handleChange, handleSave, saving, errors}) => {
  return (
    <form>
      <h1>Registeer</h1>
      <TextInput name='firstName' label='firstName' value={user.firstName ? user.firstName : ``} handleChange={handleChange} error={errors.firstName} />

      <TextInput name='lastName' label='lastName' value={user.lastName ? user.lastName : ``} handleChange={handleChange} error={errors.lastName} />

      <TextInput name='username' label='username' value={user.username ? user.username : ``} handleChange={handleChange} error={errors.username} />

      <TextInput name='email' type='email' label='email' value={user.email ? user.email : ``} handleChange={handleChange} error={errors.email} />

      <TextInput name='password' type='password' label='password' value={user.password ? user.password : ``} handleChange={handleChange} error={errors.password} />
      <TextInput name='passwordRepeat' type='password' label='passwordRepeat' value={user.passwordRepeat ? user.passwordRepeat : ``} handleChange={handleChange} />


      <input type='submit' disabled={saving} value={saving
        ? `Register...`
        : `Register`} className='btn btn-primary' onClick={handleSave} />
    </form>
  );
};

RegisterForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  handleSave: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default RegisterForm;
