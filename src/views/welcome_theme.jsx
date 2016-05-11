import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import InputText from '../components/InputText';
import { getThemes, saveTheme } from '../actions/index';

import classnames from 'classnames';

require ('./styles/welcome.scss');
const classes = classnames('welcome', {});
const MSG = require('../shared/messages');

let WelcomeTheme = React.createClass({
  getInitialState: function() {
    return {
      saving: false
    }
  },

  componentWillMount: function() {
    this.props.getThemes();
  },

  formSubmit(vals) {
    this.setState({saving: true, submitted: vals});
    // setTimeout(() => this.setState({saving: false}), 2000);
    console.log('values:', vals);
  },

  render: function() {
    const { fields, handleSubmit, themes } = this.props;
    const { saving, submitted } = this.state;
    var radioButtons;


    if (this.props.themes && this.props.themes.length > 1) {
      console.log(this.props.themes[0].name);
      radioButtons = (
        <div>
          <label>
            <input type="radio" value={this.props.themes[0].planId} /> {this.props.themes[0].name}
          </label>
          <label>
            <input type="radio" value={this.props.themes[1].planId} /> {this.props.themes[2].name}
          </label>
        </div>
      );


    }

    if (!this.props.themes || this.props.themes.length < 1) {
      return (
        <div className={classes}>
          <h2>Step 2</h2>
          <p>Loading...</p>
        </div>
      )
    } else {
      return (
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <div className={classes}>
            <h2>Step 2</h2>
            <h3>Choose a theme!</h3>
            {radioButtons}
            <button type='submit'>Next</button><br/><br/>
          </div>
        </form>
      )
    }
  }
});

function validate(values) {
  const errors = {};
  if (!values.theme) {
    errors.theme = 'Enter some data';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    themes: state.themes.list
  }
}

export default reduxForm({
  form: 'welcomeThemeForm', //name of the form, doesn't have to be same as component
  fields: ['theme'],
  validate
}, mapStateToProps, { getThemes, saveTheme })(WelcomeTheme)
