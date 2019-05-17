import {Meteor} from "meteor/meteor";
import React from 'react';
import {Route, Router, Redirect} from 'react-router';
// import {join} from "path";
// import {existsSync} from "fs";
import createBrowserHistory from 'history/createBrowserHistory';
import SseEditorApp from "../imports/editor/SseEditorApp";
import SseNavigatorApp from "../imports/navigator/SseNavigatorApp";
import SseAllAnnotated from "../imports/navigator/SseAllAnnotated";
// import configurationFile from "./config";

const browserHistory = createBrowserHistory();
var basepath = "/browse/0/20/"
var autorized = false;
Meteor.callPromise("isAutorized", Meteor.userId()).then(function(result){autorized=result;})
console.log("test autorized1")
console.log(autorized)
if(autorized)
{
    basepath += '%2F' + Meteor.userId()
    console.log("innerbasepath")
    console.log(basepath)
}
else
{
    basepath += '%2Fnotautorized'
}
console.log("test autorized2")
console.log(autorized)

console.log("outerbasepath1")
console.log(basepath)
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" render={()=>(<Redirect to={basepath} />)}/>
            <Route path="/edit/:path" component={SseEditorApp}/>
            <Route exact path="/edit/" render={()=>(<Redirect to={basepath}/>)}/>
            <Route exact path="/edit" render={()=>(<Redirect to={basepath}/>)}/>
            <Route path="/browse/:fromIndex/:pageLength/:path?" component={SseNavigatorApp}/>
            <Route path="/annotated" component={SseAllAnnotated}/>
        </div>
    </Router>
);
console.log("outerbasepath2")
console.log(basepath)