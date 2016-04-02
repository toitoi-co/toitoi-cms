import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { addLocaleData } from 'react-intl';
import { IntlProvider } from 'react-intl';
import messages from './locales/en-US';

const createStoreWithMiddleware = applyMiddleware(
  promise,
  thunk
)(createStore);

/* older implementation using react-intl v1 that sniffs locale from browser and sets
   appropriate locale as the source of messages.
   see: https://alicoding.com/localizing-react-app-using-react-router-with-react-intl/
   However, all json files are compiled into project because they cannot be dynamically
   loaded unless that is done client-side. Would need to use <script async> and have
   ReactDom.render work in conjunction with the file loading first.*/

// let locale = navigator.language.split('-');
// locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
// console.log('locale:', locale);

//
// let strings = messages[locale] ? messages[locale] : messages['en-US'];
// strings = Object.assign(messages['en-US'], strings);
//
// let intlData = {
//   locales : ['en-US'],
//   messages: strings
// };

if ('ReactIntlLocaleData' in window) {
  Object.keys(ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(ReactIntlLocaleData[lang]);
  });
}

ReactDOM.render((
  <IntlProvider locale='en' messages={messages}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
  </IntlProvider>
  ), document.getElementById('app')
)
