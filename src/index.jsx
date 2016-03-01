import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router'
import reducers from './reducers'
import routes from './routes'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(
  promise,
  thunk
)(createStore);

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  ), document.getElementById('app')
)
