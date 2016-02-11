import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1><Link to="/">App Component</Link></h1>
        Links to:<br/>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/welcome">Welcome</Link></li>
        </ul>

        {this.props.children}
      </div>
    );
  }
}
