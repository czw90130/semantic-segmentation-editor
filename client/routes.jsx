import {Meteor} from "meteor/meteor";
import React from 'react';
import {Route, Router, Redirect} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import SseEditorApp from "../imports/editor/SseEditorApp";
import SseNavigatorApp from "../imports/navigator/SseNavigatorApp";
import SseAllAnnotated from "../imports/navigator/SseAllAnnotated";
import SseSignupPage from "../imports/navigator/SseSignupPage";
import SseLoginPage from "../imports/navigator/SseLoginPage";


const browserHistory = createBrowserHistory();

export const renderRoutes = function()
{
    return(
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" render={()=>(<Redirect to={"/browse/0/20/%2F"+(()=>(Meteor.userId()?Meteor.userId():"notautorized"))} />)}/>
            <Route path="/edit/:path" component={SseEditorApp}/>
            <Route exact path="/edit/" render={()=>(<Redirect to={"/browse/0/20/%2F"+(()=>(Meteor.userId()?Meteor.userId():"notautorized"))}/>)}/>
            <Route exact path="/edit" render={()=>(<Redirect to={"/browse/0/20/%2F"+(()=>(Meteor.userId()?Meteor.userId():"notautorized"))}/>)}/>
            <Route path="/browse/:fromIndex/:pageLength/:path?" component={SseNavigatorApp}/>
            <Route path="/annotated" component={SseAllAnnotated}/>
            <Route path="/notautorized" render={()=>(<Redirect to="/browse/0/20/%2Fnotautorized" />)}/>
            <Route exact path="/login" component={SseLoginPage}/>
            <Route excct path="/signup" component={SseSignupPage}/>
        </div>
    </Router>
);
}
