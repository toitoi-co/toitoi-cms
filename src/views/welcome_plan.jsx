import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

const WelcomePlan = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className={classes}>
        <h2>Step 3</h2>
        <h3>Select your plan</h3>
        <ul>
          <li>Free</li>
          <li>Plan One</li>
          <li></li>
        </ul>
        <br/><br/>
        <form action="" method="POST" id="payment-form">
          <input type="hidden"/>
          <span class="payment-errors"></span>

          <div class="form-row">
            <label>
              <span>Card Number</span>
              <input type="text" size="20" data-stripe="number"/>
            </label>
          </div>

          <div class="form-row">
            <label>
              <span>Expiration (MM/YY)</span>
              <input type="text" size="2" data-stripe="exp_month"/>
            </label>
            <span> / </span>
            <input type="text" size="2" data-stripe="exp_year"/>
          </div>

          <div class="form-row">
            <label>
              <span>CVC</span>
              <input type="text" size="4" data-stripe="cvc"/>
            </label>
          </div>

          <input type="submit" class="submit" value="Submit Payment"/>
        </form>
        <Link to="/" className="btn btn-primary">
          Finish
        </Link>
      </div>
    )
  }
});

export default WelcomePlan;
