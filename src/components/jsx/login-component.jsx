var React = require('react');
var classnames = require('classnames');
import auth from '../../shared/auth'

/* This stuff is required to make more-or-less 'isolated' styles for each component
 * work. It's all a bit hacky, but it doesn't seem that there's really any better
 * solution for this in React. Just make sure to always define this kind of require
 * for a component. Mind that the class that is defined in test-component.scss refers
 * to the same class that is defined below in the `classnames` call.
 */
require('../styles/login-component.scss')

var classes = classnames('login-component', {
  // no conditional classes yet - docs at https://www.npmjs.com/package/classnames
});

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const newUser = event.target.elements.newUser.value
    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props.location

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        if (newUser === 'yes') {
          this.context.router.replace('/wizard')
        } else {
          this.context.router.replace('/dashboard')
        }
      }
    })
  },



  render() {
    return (
      <div className={classes}>
        <form ref="loginForm" onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          First time here?<br/>
          <label><input type="radio" name="newUser" value="yes" defaultChecked/><span>Yes</span></label><br/>
          <label><input type="radio" name="newUser" value="no"/><span>No</span></label><br/>
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
      </div>
    )
  }
})
