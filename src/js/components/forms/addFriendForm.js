/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T20:05:11+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import TextInput from '../common/textInput';

const addFriendForm = ({user, handleChange, errors}) => {
  return (
    <form>
      <h1>Login</h1>
      <TextInput name='username' label='username' value={user.username ? user.username : ``} handleChange={handleChange} error={errors.username} />


    </form>
  );
};

addFriendForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default addFriendForm;
