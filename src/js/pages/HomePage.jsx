/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T18:40:01+01:00
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
import global from '../lib/const/global';
import FriendsPage from './FriendsPage';

class HomePage extends Component {
  state = {
    text: ``,
    isMessage: false,
    isAccept: false,
    youStream: null,
    strangerStream: null,
    meId: null,
    friend: null,
    canStart: false
  }

  constructor(props, context) {
    super(props, context);
    const self = this;
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

    global.events.on(eventNames.NEWCALL, () => {
      self.setState({isAccept: true, text: `hallo, accpet`});
    });

    global.events.on(eventNames.CONNECT, user => {
      global.events.emit(`search`, user);
      this.setState({canStart: true});
    });

    global.events.on(eventNames.NEWFRIEND, friend => {
      self.setState({isMessage: true, text: `hallo, accpet`});
      let userId;
      try {
        userId = JSON.parse(localStorage.getItem(`userId`));
        self.setState({meId: userId, friend});
        if (userId) {
          this.props.friendActions.loadFriends(userId);
        } else {
          console.log(`no user id`);
          self.context.router.push(`/login`);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  onAccept = e => {
    e.preventDefault();
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
    e.preventDefault();
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

  render() {
    const {isMessage, isAccept} = this.state;

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
      return (
        <div>
          <Accept text={this.state.text} onAccept={this.onAccept} onDecline={this.onDecline} />
          {getVideo(false)}
        </div>
      );
    } else if (this.state.canStart) {
      return (
        <div>
          <button className='endCall' onClick={this.endCall}>End call</button>
          {getVideo(false)}
        </div>
      );

    } else {
      return (
        <div>
          {getVideo(true)}
          <button onClick={this.onRandom}>Random user</button>
        </div>
      );
    }

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
