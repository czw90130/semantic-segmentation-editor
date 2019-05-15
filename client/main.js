import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {renderRoutes} from './routes';

import '../server/accounts-config.js';

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('app-content'));
});
