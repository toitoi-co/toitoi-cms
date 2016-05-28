import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import App from './components/app';
import Landing from './views/landing';
import Confirmation from './views/confirmation';
import Dashboard from './views/dashboard';
import DashboardAbout from './views/dashboard_about';
import DashboardContact from './views/dashboard_contact';
import DashboardGallery from './views/dashboard_gallery';
import DashboardLanding from './views/dashboard_landing';
import DashboardMediaRelations from './views/dashboard_mediarelations';
import DashboardSchmopera from './views/dashboard_schmopera';
import DashboardSocial from './views/dashboard_social';
import DashboardTestimonials from './views/dashboard_testimonials';
import NoConfirmation from './views/noconfirmation';
import PasswordReset from './views/password_reset';
import Themes from './views/themes';
import Welcome from './views/welcome';
import WelcomeSite from './views/welcome_site';
import WelcomePlan from './views/welcome_plan';
import WelcomeTheme from './views/welcome_theme';

import GiantForm from './views/giantform';

import auth from './shared/auth';
import { checkAuth } from './actions/index';
import CST from './shared/constants';



let routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>
    <Route path="unconfirmed" component={Confirmation}/>
    <Route path="confirm/:id" component={Confirmation}/>
    <Route path="confirmed" component={Confirmation}/>
    <Route path="reset" component={PasswordReset}/>
    <Route path="reset/:id" component={PasswordReset}/>
    <Route path="dashboard" component={Dashboard}>
      <IndexRoute component={DashboardLanding}/>
      <Route path="about" component={DashboardAbout}/>
      <Route path="social" component={DashboardSocial}/>
      <Route path="gallery" component={DashboardGallery}/>
      <Route path="mediarelations" component={DashboardMediaRelations}/>
      <Route path="testimonials" component={DashboardTestimonials}/>
      <Route path="contact" component={DashboardContact}/>
      <Route path="schmopera" component={DashboardSchmopera}/>
    </Route>
    <Route path="themes" component={Themes}/>
    <Route path="welcome" component={Welcome}>
      <IndexRoute component={WelcomeSite}/>
      <Route path="plan" component={WelcomePlan}/>
      <Route path="theme" component={WelcomeTheme}/>
    </Route>
    <Route path="giantform" component={GiantForm}/>
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
