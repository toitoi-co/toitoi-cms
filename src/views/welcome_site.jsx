import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import { setPassword } from '../actions/index'
import { Link } from 'react-router';
import InputText from '../components/InputText';
import classnames from 'classnames';
import messages from '../shared/messages';

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

let WelcomeSite = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    return {
      msg: messages,
      saving: false
    }
  },

  formSubmit(props) {
    this.context.router.push('/welcome/theme')
  },

  render() {
    const { fields, handleSubmit } = this.props;
    const { saving, submitted } = this.state;

    return (
      <form onSubmit={handleSubmit(this.formSubmit)}>
        <h1>Step 1</h1>
        <h3>Welcome!</h3>
          <InputText
            disabled={saving}
            field={fields.site}
            id='welcome-site'
            label='Input label:'
            placeholder='your site.'
          /><span>.toitoi.co</span><br/>
        <button type="submit" className="btn btn-primary">Next</button>
      </form>
    )
  }
});

function validate(values) {
  const errors = {};
  if (!values.password) {
    errors.password = messages.error_password;
  }
  if (!values.password2) {
    errors.password2 = messages.error_password_repeat;
  }
  if (values.password2 && values.password !== values.password2) {
    errors.password2 = messages.error_password_match;
  }
  return errors;
}

export default reduxForm({
  form: 'welcomeSiteForm', //name of the form, doesn't have to be same as component
  fields: ['site'],
  validate
}, null, null)(WelcomeSite)
