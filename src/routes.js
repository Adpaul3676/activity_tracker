import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/landing/landing';
import Auth from './components/auth/auth';
import Home from './components/home/home';
import Activities from './components/activities/activities';

export default (
  <Switch>
    <Route component={Landing} exact path="/"></Route>
    <Route component={Auth} path="/auth"></Route>
    <Route component={Home} path="/home"></Route>
    <Route component={Activites} path="/activities"></Route>
  </Switch>

)