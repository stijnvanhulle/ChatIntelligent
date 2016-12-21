/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:31:57+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-21T13:44:49+01:00
* @License: stijnvanhulle.be
*/

import React, {PropTypes} from 'react';

const TextInput = ({
  name,
  label,
  handleChange,
  placeholder,
  value,
  error,
  type
}) => {
  let wrapperClass = `form-group`;
  if (error && error.length > 0) {
    wrapperClass += ` ` + `has-error`;
  }
  if (!type)
    type = `text`;

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className='field'>
        <input type={type} name={name} className='form-control' placeholder={placeholder} value={value} onChange={handleChange} /> {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
