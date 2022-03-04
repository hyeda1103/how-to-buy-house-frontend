import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from '^/store';

function AdminRoute({ ...routeProps }: RouteProps) {
  const { userAuth } = useSelector((state: RootState) => state.auth);
  if (userAuth?.isAdmin) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
}

export default AdminRoute;
