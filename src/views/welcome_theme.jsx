import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { getThemes, selectTheme } from '../actions/index';
// import { Link } from 'react-router';
import classnames from 'classnames';

require ('../scss/views/welcome.scss');

const classes = classnames('welcome', {});
const MSG = require('../shared/messages');
const STEPS = require('../shared/welcome_steps');

let WelcomeTheme = React.createClass({
  getInitialState: function() {
    console.log('user:', this.props.user);
    return {
      saving: false
    }
  },

  componentWillMount: function() {
    this.props.getThemes();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.user) {
      if (nextProps.user.site.presetId) {
        STEPS.gotoNextStep();
      }
    }
  },

  // formSubmit: function(vals) {
  //   // this.setState({saving: true, submitted: vals});
  //   // setTimeout(() => this.setState({saving: false}), 2000);
  //   console.log('values:', vals);
  //   // this.props.selectTheme();
  // },

  formSubmit: function(values) {
    this.props.selectTheme(values.theme, this.props.user, true);
  },

  render: function() {
    const { fields: {theme}, error, handleSubmit, themes, loading } = this.props;
    const { saving, submitted } = this.state;

    if (!this.props.themes || this.props.themes.length < 1) {
      return (
        <div className={classes}>
          <h2>Step 2</h2>
          <p>Loading...</p>
          {error}
        </div>
      )
    } else {
      let radioButtons = (
        <ul>
          {themes.map(function(thisTheme, i) {
            if (thisTheme.isAvailable && thisTheme.isEnabled) {
              return (
                <li key={i}><input type="radio" {...theme} value={thisTheme.id} />{thisTheme.name}</li>
              )
            }
          })}
        </ul>
      );

      return (
        <div className={classes}>
          <form onSubmit={handleSubmit(this.formSubmit)}>
            <h2>Step 2</h2>
            <h3>Choose a theme!</h3>
            {radioButtons}
            <button type="submit" className="btn btn-primary">Next</button>
            <br/><br/>
            {theme.touched && theme.error && <div>{theme.error}</div>}
            {this.props.loading ? 'Installing...' : ''}
          </form>
          {error}
        </div>
      );
    }
  }
});

function validate(values) {
  // console.log(values);
  const errors = {};
  if (!values.theme) {
    errors.theme = 'Choose a theme';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    themes: state.themes.list,
    error: state.themes.error,
    loading: state.themes.loading
  }
}

WelcomeTheme.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'welcomeThemeForm', //name of the form, doesn't have to be same as component
  fields: ['theme'],
  validate
}, mapStateToProps, { getThemes, selectTheme })(WelcomeTheme)
