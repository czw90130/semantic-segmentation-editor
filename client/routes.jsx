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
if(Meteor.userId()) // && existsSync(join(configurationFile.imagesFolder, Meteor.userId())))
{
    Meteor.call("isAutorized", params.path, fi, ti, (err, res) => 
    {
        if (res)
        {
            if(res.autorstate)
            {
                basepath += '%2F' + Meteor.userId()
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
    });
}
else
{
    basepath += '%2Fnotautorized'
}
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