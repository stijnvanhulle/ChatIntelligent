/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-13T21:27:17+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as streamActions from '../actions/streamActions';
import Video from '../components/Video';

class HomePage extends Component {

  constructor(props, context) {
    super(props, context);
  }
  state = {
    youStream: null,
    strangerStream: null
  }
  render() {
    return (
      <div>
        <Video stream={this.props.youStream} muted={true} />
        <Video stream={this.props.strangerStream} muted={false} />
      </div>
    );

  }

}

const mapStateToProps = (mapState, ownProps) => {
  return {youStream: mapState.youStream, strangerStream: mapState.strangerStream};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(streamActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);