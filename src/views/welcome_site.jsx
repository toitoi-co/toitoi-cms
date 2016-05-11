import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { saveSite } from '../actions/index'
import { Link } from 'react-router';
import InputText from '../components/InputText';
import classnames from 'classnames';

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})
const MSG = require('../shared/messages');

let WelcomeSite = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    return {
      saving: false
    }
  },

  formSubmit: function(vals) {
    console.log('vals:', vals);
    this.props.saveSite(vals);
  },

  render() {
    const { fields, handleSubmit } = this.props;
    const { saving, submitted } = this.state;

    return (
      <div>
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
  return errors;
}

function mapStateToProps(state) {
  return {
    welcome: state.welcome
  }
}

export default reduxForm({
  form: 'welcomeSiteForm', //name of the form, doesn't have to be same as component
  fields: ['subdomainName', 'siteName'],
  validate
}, mapStateToProps, {saveSite})(WelcomeSite)
