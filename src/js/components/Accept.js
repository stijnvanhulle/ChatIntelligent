/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T16:59:13+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import SweetAlert from 'sweetalert-react';

class Accept extends Component {
  state = {
    show: true
  }
  constructor(props, context) {
    super(props, context);
  }

  /*}({text, handleAccept, handleDecline}) => {
  <button className='btn btn-primary' onClick={handleAccept}>Accept</button>
  <button className='btn btn-primary' onClick={handleDecline}>Decline</button>
      <p>{text}</p>
      */

  render() {
    const {show} = this.state;
    return (
      <div className='message'>
        <h1>Accept</h1>

        <SweetAlert show={show} confirmButtonText='Accept' cancelButtonText='Reject' title='Accept' showCancelButton text={this.props.text} onConfirm={() => {
          this.setState({show: false});
          this.props.handleAccept();
        }} onCancel={() => {
          this.setState({show: false});
          this.props.handleDecline();
        }} onEscapeKey={() => this.setState({show: false})} onOutsideClick={() => this.setState({show: false})} />

      </div>
    );
  }

}

Accept.propTypes = {
  text: React.PropTypes.string,
  handleAccept: React.PropTypes.func.isRequired,
  handleDecline: React.PropTypes.func.isRequired
};

export default Accept;
