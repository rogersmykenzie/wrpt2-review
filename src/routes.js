import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Error from './components/Error/Error';
import Home from './components/Home/Home';
import NewRecipe from './components/NewRecipe/NewRecipe';
import ViewRecipe from './components/ViewRecipe/ViewRecipe';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

export default (
  <Switch>
    <Route path="/view" component={ViewRecipe} />
    <Route path="/new" component={NewRecipe} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route component={Error} />
  </Switch>
);