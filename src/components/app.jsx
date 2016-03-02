'use strict';

const React = require('react');
const { Link } = require('react-router');

const App = React.createClass({
  render: function() {
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
});

export default App;
