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
var iscalled = false;

Meteor.call("isAutorized", Meteor.userId(), (err, res) => 
{
    if (res)
    {
        console.log("res.autorstate")
        console.log(res.autorstate)
        if(res.autorstate)
        {
            basepath += '%2F' + Meteor.userId()
            console.log("innerbasepath")
            console.log(basepath)
        }
        else
        {
            basepath += '%2Fnotautorized'
        }
    }
    else
    {
        basepath += '%2Fnotautorized'
    }
    iscalled = true;
});

function sleep(ms) 
{
    return new Promise(resolve => 
        setTimeout(resolve, ms)
    )
}
console.log("iscalled")
console.log(iscalled)
for(var i=0; i<1000; i++)
{
    if(iscalled)
    {
        break;
    }
    sleep(1);
}
console.log("outerbasepath1")
console.log(basepath)
console.log(iscalled)
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
console.log(iscalled)