import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'
import PaymentWrapper from '../components/PaymentWrapper';

require ('./styles/welcome.scss');

const classes = classnames('welcome', {})
const publicKey = 'pk_test_gBQEOMI18FWm9j9xM27zM1Jg';
const WelcomePlan = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    }
  },

  stripeLoaded: function() {
    Stripe.setPublishableKey(publicKey);
    this.setState({loaded: true});
  },

  render: function() {
    let stripeProps = {
      loaded: this.state.loaded
    };
    return (
      <div className={classes}>
        <h2>Step 3</h2>
        <h3>Select your plan</h3>
        <PaymentWrapper asyncScriptOnLoad={this.stripeLoaded} {...stripeProps}/>
      </div>
    )
  }
});

function onLoad() {

}

export default WelcomePlan;
