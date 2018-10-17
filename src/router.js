import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import asyncComponent from './AsyncComponent';

// import IndexPage from 'ROUTES/indexPage/index';
// import CountPage from 'ROUTES/countPage/index';
// import UsersPage from 'ROUTES/users/index';
// import LoginPage from 'ROUTES/login/index';

const IndexPage = asyncComponent(() => import('ROUTES/indexPage/index'));
const UsersPage = asyncComponent(() => import('ROUTES/users/index'));
const LoginPage = asyncComponent(() => import('ROUTES/login/index'));
const CountPage = asyncComponent(() => import('ROUTES/countPage/index'));


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/count" exact component={CountPage} />
        <Route path="/users" exact component={UsersPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
