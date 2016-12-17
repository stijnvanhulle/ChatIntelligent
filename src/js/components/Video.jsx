/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:22:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-17T15:15:21+01:00
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
  stream: PropTypes.object,
  muted: PropTypes.bool
};

export default Video;
