'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { getThemes, selectTheme } from '../actions/index';
import classnames from 'classnames';

require ('./styles/themes.scss');
const classes = classnames('themes', {});


const Themes = React.createClass({

  installThemeHandler(id) {
    // event.preventDefault;
    let site = this.props.user.site.subdomainName + '.toitoi.co';
    this.props.selectTheme(id, site);
  },

  getHandler() {
    // event.preventDefault;
    this.props.getThemes();
  },

  renderThemes(themes) {
    const id = themes.id;
    const name = themes.name;
    const img = themes.thumbnail;
    const desc = themes.description;
    let base = this;
    return (
      <li key={id}>
        <h5>{name}</h5>
        <img src={img} alt=""/>
        <p>{desc}</p>
        <button onClick={base.installThemeHandler.bind(this, id)}>Install</button>
      </li>
    )
  },

  componentWillMount: function() {
    console.log('component will mount:', this.props);
    if (!this.props.user) {
      // if there isn't user info that means, login and subsequent user data is not stored
      // in app and should go
    }
    this.props.getThemes();
  },

  componentWillReceiveProps: function() {
    console.log('component received props:', this.props);
  },

  render: function() {
    const { themes, error, selected, user } = this.props;
    // console.log('state:', this.state);
    // console.log('props:', this.props);

    if (!this.props.user) {
      // TODO
      // no user object, therefore needs to login, so clear out auth & redirect back to login
    }
    return (
      <div className={classes}>
        Select a Theme
        <ul className="select_themes">
          {themes.map(this.renderThemes)}
        </ul>
        {error}
      </div>
    )
  }
});

function MapStateToProps(state) {
  // console.log('state:', state);
    return {
      themes: state.themes.list,
      error: state.themes.error,
      selected: state.themes.selected,
      user: state.login.user
    };
}

export default connect(MapStateToProps, { getThemes, selectTheme })(Themes)
