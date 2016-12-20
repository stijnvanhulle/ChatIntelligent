/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T20:08:47+01:00
* @License: stijnvanhulle.be
*/

import React from 'react';

const Accept = ({text, handleAccept, handleDecline}) => {
  return (
    <div className='message'>
      <h1>Accept</h1>
      <p>{text}</p>

      <button className='btn btn-primary' onClick={handleAccept}>Accept</button>
      <button className='btn btn-primary' onClick={handleDecline}>Decline</button>
    </div>
  );
};

Accept.propTypes = {
  text: React.PropTypes.string,
  handleAccept: React.PropTypes.func.isRequired,
  handleDecline: React.PropTypes.func.isRequired
};

export default Accept;
