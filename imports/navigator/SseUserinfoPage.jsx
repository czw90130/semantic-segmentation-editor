import React, {PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class SseUserinfoPage extends React.Component 
{
    constructor() {
        super();
        this.state = {
            subscription: {
                users: Meteor.subscribe('sse-all-users')
            }
        }
    }

    componentWillUnmount() {
        this.state.subscription.users.stop();
    }


    render() {
        let users = this.props.users;
        console.log(users);
        return (<div>
            <h1>VSSE User Manager</h1>

            <div>
                {users.map((user)=>{
                    if ('username' in user ) {
                        username = user.username[0];
                    } else {
                        username = '?'
                    }
                    return <div key={user._id}>{user._id} - {username}</div>
                })
                }
            </div>
        </div>)
    }
}

export default createContainer(() => {
    return {
      users: Meteor.users.find({ }).fetch(),
    };
  }, SseUserinfoPage);