import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import App from './components/app';
import Landing from './views/landing';
import Dashboard from './components/dashboard';
import DashboardLanding from './views/dashboard_landing';
import Themes from './components/themes';
import Welcome from './views/welcome';
import WelcomeSite from './views/welcome_site';
import WelcomePlan from './views/welcome_plan';
import WelcomeTheme from './views/welcome_theme';
import About from './views/about';
import auth from './shared/auth';
import { checkAuth } from './actions/index';
import CST from './shared/constants';





let routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="dashboard" component={Dashboard}>
      <IndexRoute component={DashboardLanding}/>
      <Route path="about" component={About}/>
    </Route>
    <Route path="themes" component={Themes}/>
    <Route path="welcome" component={Welcome}>
      <IndexRoute component={WelcomeSite}/>
      <Route path="plan" component={WelcomePlan}/>
      <Route path="theme" component={WelcomeTheme}/>
    </Route>
  </Route>
);

// function requireAuth(nextState, replace) {
//   axios.post(`${CST.LOGIN_URL}/generate-token`, null, { withCredentials: true })
//   .then((response) => {
//     console.log('reqAuth:', response);
//
//   })
//   .catch((err) => {
//     replace({
//       pathname: '/',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   });
//
//
//   // if (!auth.loggedIn()) {
//   //   replace({
//   //     pathname: '/',
//   //     state: { nextPathname: nextState.location.pathname }
//   //   })
//   // }
// }

export default routes;

// export default connect(null, {checkAuth})(routes)
