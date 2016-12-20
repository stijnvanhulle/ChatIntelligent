/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T19:55:16+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T18:48:07+01:00
* @License: stijnvanhulle.be
*/

/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-11-03T14:00:47+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T18:48:07+01:00
* @License: stijnvanhulle.be
*/

import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as friendActions from '../actions/friendActions';
import AddFriendForm from '../components/forms/addFriendForm';
import eventNames from '../lib/const/eventNames';
import url from '../actions/lib/url';
import {setParams} from '../lib/functions';
import global from '../lib/const/global';
class FriendsPage extends Component {
  state = {
    meId: null,
    user: {},
    users: [],
    errors: {},
    saving: false
  }
  constructor(props, context) {
    super(props, context);

    let userId;
    try {
      userId = JSON.parse(localStorage.getItem(`userId`));
      this.state.meId = userId;
      if (userId) {
        this.props.actions.loadFriends(userId);
      } else {
        console.log(`no user id`);
        this.context.router.push(`/login`);
      }
    } catch (e) {
      console.log(e);
    }

    global.events.on(eventNames.LOADFRIENDS, () => {
      this.props.actions.loadFriends(this.state.meId);
    });

  }
  addFriend = item => {
    //login
    const user = item;
    if (user.username && user.id) {
      this.props.actions.addFriend(this.state.meId, user.id).then(() => {
        console.log(`ok`);
      }).catch(err => {
        console.log(err);
      });
    }

  }
  findFriend = e => {
    e.preventDefault();
    //login
    let users = this.state.users;
    const user = this.state.user;
    if (user.username) {
      axios.get(`${url.USER}?username=${user.username}`).then(response => {
        const data = response.data;
        users = data;
        console.log(users);

        users = users.filter(item => {
          if (item && item.id != this.state.meId) {
            return item;
          }
        });

        this.setState({users});

      }).catch(err => {
        console.log(err);
      });
    }

  }
  onFriendChange = e => {
    e.preventDefault();
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value.toString();

    this.setState({user: user});
    this.findFriend(e);
  }
  callFriend = userId => {
    const self = this;
    axios.get(setParams(url.USER_ONLINE, parseFloat(userId))).then(response => {
      const data = response.data;
      if (data.online) {
        global.events.emit(eventNames.CONNECT, userId);
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

  messageView = item => {
    let confirmed;
    if (item.isConfirmed) {
      confirmed = `confirmed`;
    } else {
      confirmed = `not confirmed`;
    }
    return (
      <div key={item.user2.id}>{item.user2.firstName} {item.user2.lastName}
        -- {confirmed}
        {item.user2.online}
        <button disabled={!item.isConfirmed} onClick={this.callFriend.bind(this, item.user2.id)}>Connect</button>
      </div>
    );
  }
  messageView_users = item => {
    return (
      <div key={item.id}>{item.firstName} {item.lastName}
        <button onClick={this.addFriend.bind(this, item)}>Choose user</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <AddFriendForm onChange={this.onFriendChange} user={this.state.user} errors={this.state.errors} /> {this.state.users.map((item, i) => this.messageView_users(item, i))}

        {this.props.friends.map((item, i) => this.messageView(item, i))}
      </div>
    );
  }
}

const mapStateToProps = mapState => {
  return {friends: mapState.friends};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(friendActions, dispatch)
  };
};

FriendsPage.propTypes = {
  actions: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
