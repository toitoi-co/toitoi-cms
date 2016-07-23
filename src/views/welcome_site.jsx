import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { saveSite } from '../actions/index';
import InputText from '../components/InputText';
import classnames from 'classnames';

require ('../scss/views/welcome.scss');

const classes = classnames('welcome_site', {});
const MSG = require('../shared/messages');
const STEPS = require('../shared/welcome_steps');

let WelcomeSite = React.createClass({
  getInitialState: function() {
    return {
      saving: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.user) {
      if (nextProps.user.site.subdomainName && nextProps.user.site.subdomainName!=='') {
        STEPS.gotoNextStep();
      }
    }
  },

  formSubmit: function(vals) {
    console.log('vals:', vals);
    this.props.saveSite(vals);
  },



  render: function() {
    const { fields, handleSubmit } = this.props;
    const { saving, submitted } = this.state;

    return (
      <div className={classes}>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <h2>Step 1</h2>
          <h3>Site name</h3>
            <InputText
              disabled={saving}
              field={fields.subdomainName}
              id='welcome-subdomainName'
              label={MSG.save_subdomainName_label}
              placeholder={MSG.save_subdomainName_placeholder}
            /><span>.toitoi.co</span>
            <br/><br/>
            <InputText
              disabled={saving}
              field={fields.siteName}
              id='welcome-siteName'
              label={MSG.save_siteName_label}
              placeholder=''
            />
          <br/>
          <button type="submit" className="btn btn-primary">{MSG.welcome_continue}</button>
        </form>
        {this.props.welcome.error ? this.props.welcome.error.data.message:''}
      </div>
    )
  }
});

function validate(values) {
  const errors = {};
  if (!values.subdomainName) {
    errors.subdomainName = MSG.error_subdomainName
  }
  if (!values.siteName) {
    errors.siteName = MSG.error_subdomainName
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    login: state.login,
    welcome: state.welcome
  }
}

export default reduxForm({
  form: 'welcomeSiteForm', //name of the form, doesn't have to be same as component
  fields: ['subdomainName', 'siteName'],
  validate
}, mapStateToProps, {saveSite})(WelcomeSite)
