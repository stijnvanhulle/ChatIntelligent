/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-21T14:11:15+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-21T14:17:08+01:00
* @License: stijnvanhulle.be
*/

import React, {PropTypes} from 'react';

const Intelligent = ({speech, what}) => {
  const speechDiv = (
    <div className='speech'>
      Steve says: {speech}</div>
  );
  const whatDiv = (
    <div className='what'>
      {what}</div>
  );
  if (speech && what) {
    return (
      <div className='intelligent'>
        {speechDiv}
        {whatDiv}
      </div>
    );
  } else if (speech) {
    return (
      <div className='intelligent'>
        {speechDiv}

      </div>
    );
  } else if (what) {
    return (
      <div className='intelligent'>
        {whatDiv}

      </div>
    );
  } else {
    return (
      <div className='intelligent'></div>
    );
  }

};

Intelligent.propTypes = {
  speech: PropTypes.string,
  what: PropTypes.string
};

export default Intelligent;
