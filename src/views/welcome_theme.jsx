import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import classnames from 'classnames';
import { Link } from 'react-router';
import InputText from '../components/InputText';

require ('./styles/welcome.scss');
const classes = classnames('welcome', {});

let WelcomeTheme = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    // this.onInputChange = this.onInputChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    return {
      saving: false
    }
  },

  formSubmit(data) {
    this.setState({saving: true, submitted: data});
    // setTimeout(() => this.setState({saving: false}), 2000);
    console.log('data:', data);
    this.context.router.push('/welcome/bio');
  },

  render: function() {
    const { fields, handleSubmit } = this.props;
    const { saving, submitted } = this.state;

    return (
      <form onSubmit={handleSubmit(this.formSubmit)}>
        <div className={classes}>
          <h1>Step 2</h1>
          <h3>Choose a theme!</h3>
          <InputText
            disabled={saving}
            field={fields.theme}
            id='welcome-theme'
            label='Input label:'
            placeholder='Enter some dummy text.'
          /><br/>
        <button type='submit'>Next</button><br/><br/>
          {/*<Link to='/welcome/bio' className='btn btn-primary'>
            Next
          </Link>*/}
        </div>
      </form>
    )
  }
});

function validate(values) {
  const errors = {};
  if (!values.theme) {
    errors.theme = 'Enter some data';
  }
  return errors;
}

export default reduxForm({
  form: 'welcomeThemeForm', //name of the form, doesn't have to be same as component
  fields: ['theme'],
  validate
}, null, null)(WelcomeTheme)
