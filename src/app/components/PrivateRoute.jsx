/*
 * NAME: PrivateRoute
 * DESCRIPTION: a custom route that handles authentication - if authed param is truthy then user is authenticated
 * based on: https://reacttraining.com/react-router/web/example/auth-workflow 
 */

 import React from 'react';
import {  Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ authed, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    authed ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
export default PrivateRoute