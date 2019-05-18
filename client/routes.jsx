import {Meteor} from "meteor/meteor";
import React from 'react';
import {Route, Router, Redirect} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import SseEditorApp from "../imports/editor/SseEditorApp";
import SseNavigatorApp from "../imports/navigator/SseNavigatorApp";
import SseAllAnnotated from "../imports/navigator/SseAllAnnotated";
import SseNavigatorApp from "../imports/navigator/SseNavigatorApp";
import SseSignupPage from "../imports/navigator/SseSignupPage";
import SseLoginPage from "../imports/navigator/SseLoginPage";


const browserHistory = createBrowserHistory();
var basepath = "/browse/0/20/";
if(Meteor.userId())
{
    basepath += '%2F' + Meteor.userId()
}
else
{
    basepath += '%2Fnotautorized'
}


export const renderRoutes = function()
{
    return(
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" render={()=>(<Redirect to={basepath} />)}/>
            <Route path="/edit/:path" component={SseEditorApp}/>
            <Route exact path="/edit/" render={()=>(<Redirect to={basepath}/>)}/>
            <Route exact path="/edit" render={()=>(<Redirect to={basepath}/>)}/>
            <Route path="/browse/:fromIndex/:pageLength/:path?" component={SseNavigatorApp}/>
            <Route path="/annotated" component={SseAllAnnotated}/>
            <Route path="/notautorized" render={()=>(<Redirect to="/browse/0/20/%2Fnotautorized" />)}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>
        </div>
    </Router>
);
}
