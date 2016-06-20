'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveStripeToken } from '../actions/index';
import classnames from 'classnames';

require ('./styles/payment.scss');

const classes = classnames('payment', {});
const MSG = require('../shared/messages');


let Payment = React.createClass({
  getInitialState: function() {
    return {
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    };
  },

  submitHandler: function(event) {
    var base = this;
    event.preventDefault();
    this.setState({
      submitDisabled: true,
      paymentError: null
    })
    Stripe.card.createToken(event.target, function(status, response) {
      if (response.error) {
        base.setState({
          paymentError: response.error.message,
          submitDisabled: false
        });
      } else {
        base.setState({
          paymentComplete: true,
          submitDisabled: false,
          token: response.id
        });
        //now make request back to server with token
        base.props.saveStripeToken(response.id);
      }
    })
    return false;
  },

  render: function() {
    if (this.props.loaded === false) {
      return (
        <div className={classes}>
          <p>Loading...</p>
          <br /><br />
        </div>
      );
    } else {
      return (
        <div className={classes}>
          <div>
            <form action="" method="POST" id="payment-form" onSubmit={this.submitHandler}>
              <span className="payment-errors"></span>

              <div className="form-row">
                <label>
                  <span>{MSG.payment_number_label}</span>
                  <input type="text" size="20" data-stripe="number" />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>{MSG.payment_expiry_label}</span>
                  <input type="text" size="2" data-stripe="exp_month" />
                </label>
                <span> / </span>
                <input type="text" size="2" data-stripe="exp_year" />
              </div>

              <div className="form-row">
                <label>
                  <span>{MSG.payment_cvc_label}</span>
                  <input type="text" size="4" data-stripe="cvc" />
                </label>
              </div>
              <input disabled={this.state.submitDisabled} type="submit" className="submit" value={MSG.payment_subscribe_label} />
            </form><br />
            <span>{ this.state.paymentError }</span><br />
          </div>

        </div>
      )
    }
  }
});

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, { saveStripeToken })(Payment)
