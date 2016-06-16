'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

require ('./styles/payment.scss');

const classes = classnames('payment', {});


let Payment = React.createClass({
  getInitialState: function() {
    // console.log('payment props:', this.props);

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
    Stripe.createToken(event.target, function(status, response) {
      console.log('response:', response);
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
      }
    })
    // console.log('submit:', vals);
    console.log('event:', event);
  },

  render: function() {
    if (this.props.loaded === false) {
      return (
        <div className={classes}>
          <p>Loading...</p>
          <br/><br/>
        </div>
      );
    } else {
      return (
        <div className={classes}>
            <form action="" method="POST" id="payment-form" onSubmit={this.submitHandler}>
              <span className="payment-errors"></span>

            <div className="form-row">
              <label>
                <span>Card Number</span>
                <input type="text" size="20" data-stripe="number"/>
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>Expiration (MM/YY)</span>
                <input type="text" size="2" data-stripe="exp_month"/>
              </label>
              <span> / </span>
              <input type="text" size="2" data-stripe="exp_year"/>
            </div>

            <div className="form-row">
              <label>
                <span>CVC</span>
                <input type="text" size="4" data-stripe="cvc"/>
              </label>
            </div>
            <input disabled={this.state.submitDisabled} type="submit" className="submit" value="Submit Payment"/>
          </form><br />
          <span>{ this.state.paymentError }</span><br />

        </div>
      )
    }
  }
});

function mapStateToProps(state) {
  return {
    // user: state.login.user
  }
}

export default connect(mapStateToProps, { })(Payment)
