/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-16T21:21:27+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import Peer from 'peerjs';
import axios from 'axios';
import io from 'socket.io-client';
import socketNames from '../lib/const/socketNames';
import annNames from '../lib/const/annNames';
import speak from '../lib/modules/speak';
import url from '../actions/lib/url';
import {setParams} from '../lib/functions';
import global from '../lib/const/global';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as streamActions from '../actions/streamActions';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    //this.loadSocket();
    this.loadAnn();
    this.loadUser();
  }
  state = {
    me: null,
    stranger: null,
    youStream: null,
    strangerStream: null
  }

  componentDidMount() {
    this.initStream();
  }
  loadUser = () => {
    let userId;
    try {
      userId = JSON.parse(localStorage.getItem(`userId`));
      if (userId) {
        this.state.me = {
          userId: parseFloat(userId)
        };
        axios.get(setParams(url.USER_ONLINE, parseFloat(userId))).then(response => {
          const data = response.data;
          //localStorage.setItem(`isOnline`, data.online);
        }).catch(err => {
          throw err;
        });
      } else {
        const pathname = this.props.location.pathname.replace(`/`, ``);
        if (pathname != `register`) {
          this.props.router.push(`/login`);
        }

      }
    } catch (e) {
      console.log(e);
    }

  }

  loadAnn = () => {
    let canListen = false;
    const self = this;
    if (annyang) {
      // Let's define a command.
      const commands = {};
      commands[annNames.OK] = () => {
        canListen = true;
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      annyang.addCallback(`result`, userSaid => {
        const text = userSaid[0];
        if (text === annNames.OK) {
          canListen = true;
        }
        setTimeout(function() {
          canListen = false;
        }, 5000);

        console.log(userSaid, canListen);
        if (canListen) {
          self.socket.emit(socketNames.SPEECH, text);
          if (text !== annNames.OK) {
            canListen = false;
          }

        }

      });

      // Start listening.
      annyang.start();

    }

  }
  loadSocket = () => {
    const self = this;
    this.socket = io(global.url);
    this.socket.on(socketNames.CONNECT, () => {
      this.initPeer();

      let userId;
      try {
        let obj = {};
        userId = JSON.parse(localStorage.getItem(`userId`));
        if (userId) {
          obj = {
            userId: parseFloat(userId)
          };
          this.socket.emit(socketNames.ONLINE, obj);
        } else {
          console.log(`not logged in`);
        }

      } catch (e) {
        console.log(e);
      }

    });
    this.socket.on(socketNames.SPEECH_POST, this.handleWSpeechPost);
    this.socket.on(socketNames.FOUND, this.handleWSFound);
    this.socket.on(socketNames.CALL_END, this.handelWSCallEnd);
    this.socket.on(socketNames.NEW_FRIEND, this.handleWSNewFriend);
    this.socket.on(socketNames.CALL_ACCEPT, stranger => {
      this.setState({stranger: stranger});
      global.events.emit(`canStart`, true);
    });
    this.socket.on(socketNames.CALL, this.handleWSCall);

    global.events.on(`search`, obj => {
      this.socket.emit(`search`, obj);
    });

    global.events.on(`call_end`, () => {
      this.socket.emit(socketNames.CALL_END, {
        me: this.state.me,
        stranger: this.state.stranger
      });
    });

    global.events.on(`accepted`, ok => {
      if (ok) {
        this.socket.emit(socketNames.CALL_ACCEPTED, {
          me: this.state.me,
          stranger: this.state.stranger
        });
      } else {

        this.socket.emit(socketNames.CALL_END, {
          me: this.state.me,
          stranger: this.state.stranger
        });

      }
    });

    global.socket = this.socket;
    window.socket = this.socket;
    window.speak = speak;
  }

  handleWSNewFriend = obj => {
    console.log(`new friend`, obj);
    if (obj.user2 == this.state.me.userId) {
      global.events.emit(`new_friend`, obj);
    }

  }
  handleWSCall = ({stranger, me}) => {
    if (stranger.socketId == this.state.me.socketId) {
      global.events.emit(`canStart`, true);
      global.events.emit(`new_call`, stranger);
    }

  }
  handelWSCallEnd = item => {
    if (item.socketId == this.state.me.socketId) {
      let {strangerStream} = this.state;
      strangerStream = ``;
      global.events.emit(`canStart`, false);
      this.props.actions.addStrangerStream(null);
      this.setState({strangerStream});
    }
  }

  handleStrangerStream = strangerStream => {
    this.props.actions.addStrangerStream(strangerStream);
    this.setState({strangerStream});
  }
  handleCloseStream = () => {
    let {strangerStream} = this.state;
    strangerStream = ``;
    this.socket.emit(`search`, {userId: null});
    this.setState({strangerStream});
  }

  // WS

  handleWSpeechPost = text => {
    speak(text);
  }
  handleWSFound = ({stranger, me}) => {
    if (this.state.me && stranger.userId == this.state.me.userId) {
      this.state.me = stranger;
      this.state.stranger = me;
    } else {
      this.state.me = me;
      this.state.stranger = stranger;
    }

    if (stranger.socketId != this.state.me.socketId) {
      const {youStream} = this.state;
      const call = this.peer.call(this.state.stranger.socketId, youStream);
      call.on(`stream`, this.handleStrangerStream);
      call.on(`close`, this.handleCloseStream);

    }

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
      //this.socket.emit(`search`);
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
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia({
      video: true,
      audio: true
    }, this.handleYouStream, this.handleYouStreamError);
  }

  // EVENTS

  render() {
    const childrenWithProps = React.cloneElement(this.props.children, this.props);
    return (
      <main>
        {childrenWithProps}
      </main>
    );

  }

}

App.propTypes = {
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//const mapStateToProps = (mapState, ownProps) => {
const mapStateToProps = mapState => {
  return {youStream: mapState.youStream, strangerStream: mapState.strangerStream};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(streamActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
