/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-22T17:04:28+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as streamActions from '../actions/streamActions';
import * as friendActions from '../actions/friendActions';
import eventNames from '../lib/const/eventNames';
import Video from '../components/Video';
import Accept from '../components/Accept';
import Intelligent from '../components/Intelligent';
import global from '../lib/const/global';
import {setParams} from '../lib/functions';
import url from '../actions/lib/url';
import FriendsPage from './FriendsPage';
import axios from 'axios';

class HomePage extends Component {
  state = {
    text: ``,
    isMessage: false,
    isAccept: false,
    youStream: null,
    strangerStream: null,
    me: null,
    friend: null,
    canStart: false,
    what: ``,
    speech: ``
  }

  constructor(props, context) {
    super(props, context);
    const self = this;

    let userId;
    try {
      userId = JSON.parse(localStorage.getItem(`userId`));
      this.state.me = userId;
      if (userId) {
        this.props.friendActions.loadFriends(userId);
      } else {
        console.log(`no user id`);
        if (self.context.router) {
          self.context.router.push(`/login`);
        }

      }
    } catch (e) {
      console.log(e);
    }

    global.events.on(eventNames.LISTENING, what => {
      if (what) {
        this.setState({what});
      }
    });

    global.events.on(eventNames.SPEECH, speech => {
      if (speech) {
        this.setState({speech});
      }
    });

    global.events.on(eventNames.CANSTART, ok => {
      if (ok) {
        self.setState({canStart: ok});
      } else {
        self.setState({canStart: ok});
      }
    });

    global.events.on(eventNames.ISMESSAGE, ok => {
      if (ok) {
        self.setState({isMessage: ok});
      } else {
        self.setState({isMessage: ok});
      }
    });

    global.events.on(eventNames.NEWCALL, stranger => {
      if (stranger && stranger.userId) {
        axios.get(setParams(url.USER_GET, stranger.userId)).then(response => {
          const user = response.data;
          console.log(user);
          self.setState({isAccept: true, text: `${user.firstName} ${user.lastName} want to connect with you`});
        }).catch(err => {
          console.log(err);
        });
      }

    });

    global.events.on(eventNames.CONNECT, user => {
      global.events.emit(`search`, user);
      //this.setState({canStart: true});
    });

    global.events.on(eventNames.NEWFRIEND, friend => {

      if (friend && friend.user1) {
        axios.get(setParams(url.USER_GET, friend.user1)).then(response => {
          const user = response.data;
          console.log(user);
          self.setState({isMessage: true, text: `${user.firstName} ${user.lastName} want to be your friend`, friend});
          this.props.friendActions.loadFriends(this.state.me);
        }).catch(err => {
          console.log(err);
        });
      }

    });
  }

  onAccept = e => {
    if (e) {
      e.preventDefault();
    }

    if (this.state.isAccept) {
      this.setState({isAccept: false});
      global.events.emit(eventNames.ACCEPTED, true);
    } else {
      console.log(`accept`);
      this.setState({isMessage: false});
      const {friend} = this.state;
      this.props.friendActions.acceptFriend(friend.user1, friend.user2).then(() => {
        friend.isConfirmed = true;
        console.log(friend, ` accepted`);
      }).catch(err => {
        console.log(err);
      });
    }

  }
  onDecline = e => {
    if (e) {
      e.preventDefault();
    }
    if (this.state.isAccept) {
      this.setState({isAccept: false});
      global.events.emit(eventNames.ACCEPTED, false);
    } else {
      console.log(`decline`);
      this.setState({isMessage: false});
    }

  }
  onRandom = e => {
    e.preventDefault();
    global.events.emit(eventNames.SEARCH, {userId: null});
  }
  endCall = e => {
    e.preventDefault();
    global.events.emit(eventNames.CALLEND, true);
    this.setState({canStart: false, isMessage: false, isAccept: false});
  }
  onLogOff = e => {
    e.preventDefault();
    if (this.state.me)
      axios.post(url.LOGOFF, {userId: this.state.me}).then(response => {
        const data = response.data;
        localStorage.setItem(`userId`, null);
        if (this.props.router) {
          this.props.router.push(`/login`);
        }

      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    const {isMessage, isAccept} = this.state;

    let div;

    const getVideo = (onlyYou = false) => {
      if (onlyYou) {
        return (
          <div>
            <div className='friends'>
              <FriendsPage />
            </div>
            <div className='chat'>
              <Video stream={this.props.youStream} muted={true} />
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className='friends'>
              <FriendsPage />
            </div>
            <div className='chat'>
              <Video stream={this.props.youStream} muted={true} />
              <Video stream={this.props.strangerStream} muted={false} />
            </div>
          </div>
        );
      }

    };

    if (isMessage || isAccept) {
      div = (
        <div>
          <Accept text={this.state.text} handleAccept={this.onAccept} handleDecline={this.onDecline} /> {getVideo(false)}
        </div>
      );
    } else if (this.state.canStart) {
      div = (
        <div>
          <button className='endCall' onClick={this.endCall}>End call</button>
          {getVideo(false)}
        </div>
      );

    } else {
      div = (
        <div>
          {getVideo(true)}
          <button onClick={this.onRandom}>Random user</button>
        </div>
      );
    }

    return (
      <div>
        <Intelligent speech={this.state.speech} what={this.state.what} />
        <button onClick={this.onLogOff}>Log off</button>
        {div}</div>
    );

  }

}

//const mapStateToProps = (mapState, ownProps) => {
const mapStateToProps = mapState => {
  return {youStream: mapState.youStream, strangerStream: mapState.strangerStream, users: mapState.users};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(streamActions, dispatch),
    friendActions: bindActionCreators(friendActions, dispatch)
  };
};

HomePage.propTypes = {
  youStream: PropTypes.object,
  strangerStream: PropTypes.object,
  actions: React.PropTypes.object,
  friendActions: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
