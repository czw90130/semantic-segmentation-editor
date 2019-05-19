import React from 'react';
import { Link } from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import {MuiThemeProvider} from '@material-ui/core/styles';
import SseTheme from "../common/SseTheme";

class SseUserinfoPage extends React.Component 
{

    render()
    {
        console.log("this.props.alluserData")
        console.log(this.props.alluserData)
        return (<MuiThemeProvider theme={new SseTheme().theme}>
        <div className="w100">
            <div>
                {this.props.alluserData}
            </div>
        </div>
        </MuiThemeProvider>
        );
    }
}

export default withTracker((props) => {
    console.log("sse-all-users0")
    
    const allUserD =  Meteor.subscribe("sse-all-users");
    const alluserData = Meteor.users.find({}).fetch();
    
    console.log(allUserD)
    console.log(alluserData)
    console.log("sse-all-users1")
    Meteor.users.find().forEach(function(oneUser) {
        console.log(oneUser);
    })
    return {alluserData}
})(SseUserinfoPage);