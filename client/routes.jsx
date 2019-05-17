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
var basepath = "/browse/0/20/";
if(Meteor.userId())
{
    basepath += '%2F' + Meteor.userId()
}
else
{
    basepath += '%2Fnotautorized'
}


console.log("outerbasepath1")
console.log(basepath)
export const renderRoutes = function()
{
    // var autorstate = await Meteor.callPromise("isAutorized", Meteor.userId());
    // console.log(autorstate)
    // if(autorstate)
    // {
    //     basepath += '%2F' + Meteor.userId()
    //     console.log("innerbasepath")
    //     console.log(basepath)
    // }
    // else
    // {
    //     basepath += '%2Fnotautorized'
    // }

    // console.log("outerbasepath1")
    // console.log(basepath)
    return(
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" render={()=>(<Redirect to={basepath} />)}/>
            <Route path="/edit/:path" component={SseEditorApp}/>
            <Route exact path="/edit/" render={()=>(<Redirect to={basepath}/>)}/>
            <Route exact path="/edit" render={()=>(<Redirect to={basepath}/>)}/>
            <Route path="/browse/:fromIndex/:pageLength/:path?" component={SseNavigatorApp}/>
            <Route path="/annotated" component={SseAllAnnotated}/>
            <Route exact path="/notautorized" render={()=>(<Redirect to="/browse/0/20/%2Fnotautorized" />)}/>
        </div>
    </Router>
);
}
console.log("outerbasepath2")
console.log(basepath)