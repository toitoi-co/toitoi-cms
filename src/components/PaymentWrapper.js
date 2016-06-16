'use strict';

import React from 'react';
import makeAsyncScriptLoader from 'react-async-script';
import Payment from './Payment';

const URL = 'https://js.stripe.com/v2/';

export default makeAsyncScriptLoader(Payment, URL, {});
