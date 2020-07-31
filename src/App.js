import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import FatalError from './pages/FatalError';

import withAuth from './hocs/withAuth';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter FallbackComponent={FatalError}>
        <Switch>
          <Route path="/signin" component={withAuth(Signin, false)}></Route>
          <Route path="/" exact component={withAuth(Home, true)}></Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  )
}