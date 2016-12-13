/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-13T11:32:29+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-13T11:55:06+01:00
* @License: stijnvanhulle.be
*/



import React, {Component} from 'react';
import IO from 'socket.io-client';
import Peer from 'peerjs';

import Video from '../components/Video';

class App extends Component {

  state = {
    youStream: undefined,
    strangerStream: undefined
  }
  constructor(props, context) {
    super(props, context);
    if (annyang) {
      // Let's define a command.
      const commands = {
        hello: function() {
          alert(`Hello world!`);
        }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);


      // Start listening.
      annyang.start();
    }
  }

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

  }

  handleCloseStream = () => {
    let {strangerStream} = this.state;
    strangerStream = undefined;

    this.socket.emit(`search`);

    this.setState({strangerStream});
  }

  handleStrangerStream = strangerStream => {
    this.setState({strangerStream});
  }

  handleWSFound = strangerId => {
    const {youStream} = this.state;

    const call = this.peer.call(strangerId, youStream);
    call.on(`stream`, this.handleStrangerStream);
    call.on(`close`, this.handleCloseStream);

  }

  initSocket() {
    // '/' gaat verbinden met de server waar het op draait
    this.socket = IO(`/`);
    this.socket.on(`connect`, this.initPeer);
    this.socket.on(`found`, this.handleWSFound);
  }

  handleYouStream = youStream => {
    this.setState({youStream});
    this.initSocket();
  }

  handleYouStreamError = e => console.error(e);

  initStream() {
    navigator.getUserMedia({
      audio: true,
      video: true
    }, this.handleYouStream, this.handleYouStreamError);
  }

  componentDidMount() {
    this.initStream();
  }

  render() {
    const {youStream, strangerStream} = this.state;

    return (
      <main>
        <Video stream={youStream} muted={true} />
        <Video stream={strangerStream} muted={false} />
      </main>
    );
  }
}

export default App;
