/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T16:49:46+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';
import TextInput from './common/textInput';

const AcceptFriendship = ({text, onAccept, onDecline}) => {
  return (
    <div className='message'>
      <h1>Accept</h1>
      <p>{text}</p>

      <button className='btn btn-primary' onClick={onAccept}>Accept</button>
      <button className='btn btn-primary' onClick={onDecline}>Decline</button>
    </div>
  );
};

AcceptFriendship.propTypes = {
  text: React.PropTypes.String,
  onAccept: React.PropTypes.func.isRequired,
  onDecline: React.PropTypes.func.isRequired
};

export default AcceptFriendship;
