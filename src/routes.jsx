import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'
import Landing from './components/landing'
import Dashboard from './components/dashboard'
import Welcome from './components/welcome'
import Welcome_1 from './components/welcome_1'
import Welcome_2 from './components/welcome_2'
import Welcome_3 from './components/welcome_3'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="welcome" component={Welcome}>
      <IndexRoute component={Welcome_1} />
      <Route path="2" component={Welcome_2} />
      <Route path="3" component={Welcome_3} />
    </Route>
  </Route>
)
