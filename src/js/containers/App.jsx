/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T16:32:07+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import Peer from 'peerjs';
import axios from 'axios';
import io from 'socket.io-client';
import socketNames from '../lib/const/socketNames';
import eventNames from '../lib/const/eventNames';
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
    this.loadUser();
    this.loadAnn();

    global.events.on(eventNames.LOGIN, () => {
      //this.loadUser();
    });
  }
  state = {
    socket: null,
    me: null,
    stranger: null,
    youStream: null,
    strangerStream: null
  }

  reset() {
    global.events.emit(eventNames.CANSTART, false);
    global.events.emit(eventNames.ISMESSAGE, false);
    this.props.actions.addStrangerStream(null);
    this.setState({me: null, stranger: null, strangerStream: null});
    //this.initStream();
    location.reload();
  }

  componentDidMount() {
    this.initStream();
  }
  loadUser = () => {
    let userId;
    let pathname;
    const self = this;
    try {
      pathname = this.props.location.pathname.replace(`/`, ``);

      userId = JSON.parse(localStorage.getItem(`userId`));
      if (userId) {
        this.state.me = {
          userId: parseFloat(userId)
        };
        axios.get(setParams(url.USER_ONLINE, parseFloat(userId))).then(() => {
          //const data = response.data;
          //localStorage.setItem(`isOnline`, data.online);
        }).catch(e => {
          console.log(e);
          if (pathname !== `register`) {
            this.props.router.push(`/login`);
          }
        });
      } else {

        if (pathname !== `register`) {
          this.props.router.push(`/login`);
        }

      }
    } catch (e) {
      console.log(e);
      if (pathname !== `register`) {
        this.props.router.push(`/login`);
      }
    }

  }

  loadAnn = () => {
    const self = this;
    const annyang = window.annyang || annyang;
    if (annyang) {
      // Let's define a command.
      const commands = {};
      commands[annNames.OK] = () => {};
      //commands[annNames.CALL] = username => {};

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.addCallback(`result`, userSaid => {

        const text = userSaid[0].trim().toLowerCase();
        console.log(userSaid, text);
        global.events.emit(eventNames.LISTENING, text);

        if (text.indexOf(annNames.CALL) !== - 1) {
          const username = text.replace(annNames.CALL, ``).trim().toLowerCase();
          if (username) {
            axios.get(`${url.USER}?username=${username}`).then(response => {
              const data = response.data;
              if (data) {
                const user = data[0];
                if (user) {
                  axios.get(setParams(url.USER_ONLINE, parseFloat(user.id))).then(response => {
                    const data = response.data;
                    if (data.online) {
                      global.events.emit(eventNames.CONNECT, user.id);
                      if (self.props.router) {
                        self.props.router.push(`/`);
                      }

                    } else {
                      console.log(`user not online`);
                    }
                  }).catch(err => {
                    throw err;
                  });
                }

              }

            }).catch(err => {
              console.log(err);
            });
          }

        }

        if (text.indexOf(annNames.ENDCALL) !== - 1) {
          global.events.emit(eventNames.CALLEND, true);
          global.events.emit(eventNames.CANSTART, false);
          global.events.emit(eventNames.ISMESSAGE, false);
        }

        //self.socket.emit(socketNames.SPEECH, {text, me: this.state.me});
        if (text !== annNames.OK) {
          //canListen = false;
        }

        if (text.indexOf(annNames.STEVE) !== - 1 && text.indexOf(annNames.STEVE) < 2) {
          const what = text.replace(annNames.STEVE, ``).trim().toLowerCase();
          if (what) {
            self.socket.emit(socketNames.SPEECH, {text, me: this.state.me});
          }
        }

      });

      // Start listening.
      annyang.start();
    }

  }
  loadSocket = () => {
    //const self = this;
    this.socket = io(global.url);
    this.socket.on(socketNames.CONNECT, () => {
      try {
        this.initPeer();
      } catch (e) {
        console.log(e);
        this.reset();
      }

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
    this.socket.on(socketNames.NEW_FRIEND_ACCEPTED, this.handleWSNewFriendAccepted);
    this.socket.on(socketNames.CALL_ACCEPT, stranger => {
      this.setState({stranger: stranger});
      global.events.emit(eventNames.CANSTART, true);
    });
    this.socket.on(socketNames.CALL, this.handleWSCall);

    global.events.on(eventNames.SEARCH, obj => {
      this.socket.emit(socketNames.SEARCH, obj);
    });

    global.events.on(eventNames.CALLEND, () => {
      this.socket.emit(socketNames.CALL_END, {
        me: this.state.me,
        stranger: this.state.stranger
      });
    });

    global.events.on(eventNames.ACCEPTED, ok => {
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
    window.global = global;
  }

  handleWSNewFriend = obj => {
    console.log(`new friend`, obj);
    if (obj.user2 === this.state.me.userId) {
      global.events.emit(eventNames.NEWFRIEND, obj);
    }
    global.events.emit(eventNames.LOADFRIENDS);

  }
  handleWSNewFriendAccepted = () => {
    global.events.emit(eventNames.LOADFRIENDS);

  }

  handleWSCall = ({stranger, me}) => {
    if (stranger.socketId === this.state.me.socketId) {
      global.events.emit(eventNames.CANSTART, true);
      global.events.emit(eventNames.NEWCALL, stranger);
    }

  }
  handelWSCallEnd = item => {
    global.events.emit(eventNames.ISMESSAGE, false);
    if (this.peer.disconnected) {
      this.peer.reconnect();
    }
    if (this.state.me) {
      if (item.socketId === this.state.me.socketId || item.socketId === this.state.me.paired) {
        this.reset();
      }
    }

  }

  handleStrangerStream = strangerStream => {
    this.props.actions.addStrangerStream(strangerStream);
    this.setState({strangerStream});
  }
  handleCloseStream = () => {
    let {strangerStream} = this.state;
    strangerStream = ``;
    this.socket.emit(socketNames.SEARCH, {userId: null});
    this.setState({strangerStream});
  }

  // WS

  handleWSpeechPost = text => {
    global.events.emit(eventNames.SPEECH, text);
    speak(text);

  }
  handleWSFound = ({stranger, me}) => {
    if (this.state.me && stranger.userId === this.state.me.userId) {
      this.setState({me: stranger, stranger: me});
    } else {
      this.setState({me, stranger});
    }

    try {
      if (stranger.socketId !== this.state.me.socketId) {
        const {youStream} = this.state;
        const call = this.peer.call(this.state.stranger.socketId, youStream);
        if (call) {
          call.on(`stream`, this.handleStrangerStream);
          call.on(`close`, this.handleCloseStream);
        } else {
          console.log(`cannot call to `);
          this.socket.emit(socketNames.CALL_END, {
            me: this.state.me,
            stranger: this.state.stranger
          });
        }

      }
    } catch (e) {
      console.log(e);
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
      //const self = this;
      console.log(`PEER OPEN`);
    });

    this.peer.on(`error`, err => {
      console.log(err);

      this.socket.emit(socketNames.CALL_END, {
        me: this.state.me,
        stranger: this.state.stranger
      });
    });

    this.peer.on(`call`, call => {
      const {youStream} = this.state;
      call.answer(youStream);
      call.on(`stream`, this.handleStrangerStream);
      call.on(`close`, this.handleCloseStream);
    }, err => {
      console.log(`Failed to get local stream`, err);
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
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;

    navigator.getUserMedia({
      video: true, audio: true //TODO: change to true
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
  actions: PropTypes.object.isRequired,
  location: PropTypes.object
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
