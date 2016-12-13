/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-13T22:11:39+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';
import socketNames from '../lib/const/socketNames';
import annNames from '../lib/const/annNames';
import speak from '../lib/modules/speak';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as streamActions from '../actions/streamActions';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    //this.loadSocket();
    this.loadAnn();
    speak(`Welcome on alo`);
  }
  state = {
    youStream: null,
    strangerStream: null
  }

  componentDidMount() {
    this.initStream();
  }

  loadAnn = () => {
    if (annyang) {
      // Let's define a command.
      const commands = {};
      commands[annNames.ONLINE] = () => {
        speak(`hello world`);

      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start();

    }

  }
  loadSocket = () => {
    this.socket = io(`/`);
    this.socket.on(socketNames.CONNECT, () => {
      this.initPeer();
    });
    this.socket.on(`found`, this.handleWSFound);

    window.socket = this.socket;
  }

  handleStrangerStream = strangerStream => {
    annyang.trigger(annNames.ONLINE);
    this.props.actions.addStrangerStream(strangerStream);
    this.setState({strangerStream});
  }
  handleCloseStream = () => {
    let {strangerStream} = this.state;
    strangerStream = ``;
    this.socket.emit(`search`);
    this.setState({strangerStream});
  }

  // WS
  handleWSFound = strangeid => {
    const {youStream} = this.state;
    const call = this.peer.call(strangeid, youStream);
    call.on(`stream`, this.handleStrangerStream);
    call.on(`close`, this.handleCloseStream);
  }

  handleWSOnline = obj => {
    console.log(obj);
  }

  //peer
  initPeer = () => {
    const {id} = this.socket;

    this.peer = new Peer(id, {
      host: `serene-inlet-24249.herokuapp.com`,
      port: ``,
      path: `/api`,
      secure: true
    });
    this.peer.on(`open`, () => {
      this.socket.emit(`search`);
    });

    this.peer.on(`call`, call => {
      const {youStream} = this.state;
      call.answer(youStream);

      call.on(`stream`, this.handleStrangerStream);
      call.on(`close`, this.handleCloseStream);
    });

    console.log(id);
  }

  handleYouStream = youStream => {
    this.setState({youStream: youStream});
    this.props.actions.addYouStream(youStream);

    this.loadSocket();
  }
  handleYouStreamError = err => {
    console.error(err);
  }

  initStream() {
    navigator.getUserMedia({
      video: true,
      audio: true
    }, this.handleYouStream, this.handleYouStreamError);
  }

  // EVENTS

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );

  }

}

App.propTypes = {
  children: PropTypes.object.isRequired
};

const mapStateToProps = (mapState, ownProps) => {
  return {youStream: mapState.youStream, strangerStream: mapState.strangerStream};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(streamActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);