/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-05T14:32:42+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T17:13:21+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import SweetAlert from 'sweetalert-react';

class Message extends Component {
  state = {
    show: true
  }
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {show} = this.state;
    return (<SweetAlert show={show} title='Message' text={this.props.text} onConfirm={() => {
      this.setState({show: false});
    }} onEscapeKey={() => this.setState({show: false})} onOutsideClick={() => this.setState({show: false})} />);
  }

}

Message.propTypes = {
  text: PropTypes.string
};

export default Message;
