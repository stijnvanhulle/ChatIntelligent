/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:22:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-13T21:17:09+01:00
* @License: stijnvanhulle.be
*/


import React, {PropTypes} from 'react';

const Video = ({stream, muted}) => {

  if (stream) stream = URL.createObjectURL(stream);

  return (
    <article className='video'>
      <video autoPlay src={stream} muted={muted}></video>
      <audio autoPlay src={stream} muted={muted}></audio>
    </article>
  );
};

Video.propTypes = {
  meta: PropTypes.string,
  stream: PropTypes.object
};

export default Video;
