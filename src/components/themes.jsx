'use strict';

import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

require ('./styles/themes.scss');
const classes = classnames('themes', {});


const Themes = React.createClass({

  installThemeHandler(id) {
    event.preventDefault;
    console.log('theme installed:', id);
  },

  renderThemes(themes) {
    const id = themes.presetId;
    const name = themes.name;
    const img = themes.image;
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

  render: function() {
    const { themes, error, selected } = this.props;
    console.log('props:',this.props);
    return (
      <div className={classes}>
        Select a Theme
        <ul className="select_themes">
          {this.props.themes.map(this.renderThemes)}
        </ul>
      </div>
    )
  }
});

function MapStateToProps(state) {
  console.log('state:', state);
    return {
      themes: state.themes.list,
      error: state.themes.error,
      selected: state.themes.selected
    };
}

export default connect(MapStateToProps)(Themes)
