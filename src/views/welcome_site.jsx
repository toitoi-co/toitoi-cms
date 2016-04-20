import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { saveSite } from '../actions/index'
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

  formSubmit: function(vals) {
    this.props.saveSite(vals);
  },

  render() {
    const { fields, handleSubmit } = this.props;
    const { saving, submitted } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <h1>Step 1</h1>
          <h3>Welcome!</h3>
            <InputText
              disabled={saving}
              field={fields.site}
              id='welcome-site'
              label={this.state.msg.save_site_label}
              placeholder='your site.'
            /><span>.toitoi.co</span><br/>
          <button type="submit" className="btn btn-primary">{this.state.msg.welcome_continue}</button>
        </form>
        {this.props.welcome.error ? this.props.welcome.error.data.message:''}
      </div>
    )
  }
});

function validate(values) {
  const errors = {};
  if (!values.site) {
    errors.password = messages.error_password;
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
  fields: ['site'],
  validate
}, mapStateToProps, {saveSite})(WelcomeSite)
