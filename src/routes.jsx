import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'
import Landing from './components/landing'
import Dashboard from './components/dashboard'
import Themes from './components/themes'
import Welcome from './components/welcome'
import WelcomePassword from './components/welcome_password'
import WelcomeTheme from './components/welcome_theme'
import WelcomeBio from './components/welcome_bio'
import auth from './shared/auth'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
    <Route path="themes" component={Themes} onEnter={requireAuth}/>
    <Route path="welcome" component={Welcome}>
      <IndexRoute component={WelcomePassword} />
      <Route path="theme" component={WelcomeTheme} />
      <Route path="bio" component={WelcomeBio} />
    </Route>
  </Route>
);

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default routes;
