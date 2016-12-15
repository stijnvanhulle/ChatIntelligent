/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T16:40:03+01:00
* @License: stijnvanhulle.be
*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as streamActions from '../actions/streamActions';
import * as friendActions from '../actions/friendActions';
import Video from '../components/Video';
import AcceptFriendship from '../components/AcceptFriendship';
import socketNames from '../lib/const/socketNames';
import global from '../lib/const/global';

class HomePage extends Component {
  state = {
    text: ``,
    isMessage: false,
    youStream: null,
    strangerStream: null,
    meId: null,
    friend: null
  }

  constructor(props, context) {
    super(props, context);
    const self = this;

    global.events.on(`new_friend`, friend => {
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
    console.log(`accept`);
    this.setState({isMessage: false});
    const {friend} = this.state;
    this.props.friendActions.acceptFriend(this.state.meId, friend.user2).then(() => {
      console.log(friend, ` accepted`);
    }).catch(err => {
      console.log(err);
    });
  }
  onDecline = e => {
    console.log(`decline`);
    this.setState({isMessage: false});
  }

  render() {
    const {isMessage} = this.state;

    const video = (
      <div>
        <Video stream={this.props.youStream} muted={true} />
        <Video stream={this.props.strangerStream} muted={false} />
      </div>
    );

    if (isMessage) {
      return (
        <div>
          <AcceptFriendship text={this.state.text} onAccept={this.onAccept} onDecline={this.onDecline} /> {video}
        </div>
      );
    } else {
      return (
        <div>
          {video}
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
  strangerStream: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
