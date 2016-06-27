'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { getThemes, selectTheme, reloadUser } from '../actions/index';
import classnames from 'classnames';

require ('../scss/views/themes.scss');

const classes = classnames('themes', {});

let Themes = React.createClass({
  installThemeHandler: function(id) {
    this.props.selectTheme(id, this.props.user, false);
  },

  renderThemes(themes) {
    const id = themes.id;
    const name = themes.name;
    const img = themes.thumbnail;
    const desc = themes.description;
    if (themes.isAvailable && themes.isEnabled) {
      return (
        <li key={id}>
          <h5>{name}</h5>
          <img src={img} alt=""/>
          <p>{desc}</p>
          <button onClick={this.installThemeHandler.bind(this, id)}>Install</button>
        </li>
      );
    }
  },

  componentWillMount: function() {
    if (!this.props.user) {
      console.log('No data, get User and tokens')
      this.props.reloadUser();
    }
    this.props.getThemes();
  },

  render: function() {
    const { themes, error, user } = this.props;
    if (!this.props.user || !this.props.themes || this.props.themes.length < 1) {
      console.log('user:', this.props.user);
      console.log('themes:', this.props.themes);
      return (
        <div className={classes}>
          <h2>Select a Theme</h2>
          <p>Loading...</p>
          {error}
        </div>
      );
    } else {
      return (
        <div className={classes}>
          <h2>Select a Theme</h2>
          <ul className="select_themes">
            {themes.map(this.renderThemes)}
          </ul>
          {this.props.loading ? 'Installing...' : ''}
          {error}
        </div>
      )
    }
  }
});

function mapStateToProps(state) {
  return {
    themes: state.themes.list,
    error: state.themes.error,
    loading: state.themes.loading,
    user: state.login.user
  };
}

export default connect(mapStateToProps, { getThemes, selectTheme, reloadUser })(Themes)
