import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from '^/store';

function PrivateRoute({ ...routeProps }: RouteProps) {
  const { userAuth } = useSelector((state: RootState) => state.auth);
  if (userAuth) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
}

export default PrivateRoute;
