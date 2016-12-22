/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T14:26:49+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import TextInput from '../common/textInput';

const RegisterForm = ({user, handleChange, handleSave, saving, errors}) => {
  return (
    <form onSubmit={handleSave}>
      <h1>Registeer</h1>
      <TextInput name='firstName' required={true} label='firstName' value={user.firstName ? user.firstName : ``} handleChange={handleChange} error={errors.firstName} />

      <TextInput name='lastName' required={true} label='lastName' value={user.lastName ? user.lastName : ``} handleChange={handleChange} error={errors.lastName} />

      <TextInput name='username' required={true} label='username' value={user.username ? user.username : ``} handleChange={handleChange} error={errors.username} />

      <TextInput name='email' required={true} type='email' label='email' value={user.email ? user.email : ``} handleChange={handleChange} error={errors.email} />

      <TextInput name='password' required={true} type='password' label='password' value={user.password ? user.password : ``} handleChange={handleChange} error={errors.password} />
      <TextInput name='passwordRepeat' required={true} type='password' label='passwordRepeat' value={user.passwordRepeat ? user.passwordRepeat : ``} handleChange={handleChange} />


      <input type='submit' disabled={saving} value={saving
        ? `Register...`
        : `Register`} className='btn btn-primary' />
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
