'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { getThemes, selectTheme } from '../actions/index';
import classnames from 'classnames';

require ('./styles/themes.scss');
const classes = classnames('themes', {});


const Themes = React.createClass({

  installThemeHandler(id) {
    event.preventDefault;
    this.props.selectTheme(id);
  },

  getHandler() {
    event.preventDefault;
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
    // TODO enable following when theme data on backend is populated
    // this.props.getThemes();
  },

  render: function() {
    const { themes, error, selected } = this.props;
    // console.log('props:',this.props);
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
      selected: state.themes.selected
    };
}

export default connect(MapStateToProps, { getThemes, selectTheme })(Themes)
