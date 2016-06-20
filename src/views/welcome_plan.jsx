import React, { Component } from 'react'
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import PaymentWrapper from '../components/PaymentWrapper';

require ('./styles/welcome.scss');

const classes = classnames('welcome', {})
const publicKey = 'pk_test_gBQEOMI18FWm9j9xM27zM1Jg';

let WelcomePlan = React.createClass({
  getInitialState: function() {
    console.log('user:', this.props.user);
    return {
      loaded: false,
      payment: false,
      subscribed: false,
      presetId: null
    }
  },

  componentWillMount: function() {
    this.setState({
      // planId:
    })
  },

  stripeLoaded: function() {
    Stripe.setPublishableKey(publicKey);
    this.setState({loaded: true});
  },

  clickHandler: function(event) {
    console.log(event.target.value);
    switch (event.target.value) {
      case 0:
        // Free plan
        this.setState({payment: true, subscribed: true});
        break;
      case 1:
        // Plan One
        this.setState({payment: false, subscribed: true});
        break;
      default:
       break;
    }
  },

  // shouldComponentUpdate: function() {
  //   return false;
  // },

  render: function() {
    let stripeProps = {
      loaded: this.state.loaded
    };
    /* Check whether to show Finish button */
    var finishButton
    if (this.state.payment) {
      finishButton = <input type="submit" className="submit" value="Finish" />;
    }

    return (
      <div className={classes}>
        <h2>Step 3</h2>
        <h3>Select your plan</h3>
        <form name="selectPlanForm">
          <label><input type="radio" name="selectPlanInput" value="0" onClick={this.clickHandler}/><span>Free</span></label>
          <label><input type="radio" name="selectPlanInput" value="1" onClick={this.clickHandler}/><span>One</span></label>
        </form>
        <div>Plan One</div>
        <PaymentWrapper asyncScriptOnLoad={this.stripeLoaded} {...stripeProps}/>
        {/*<input disabled={!(this.state.payment && this.state.subscribed)} type="submit" className="submit" value='Finish' />*/}
        {finishButton}
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, { })(WelcomePlan)
