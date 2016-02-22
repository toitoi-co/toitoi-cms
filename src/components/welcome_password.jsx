import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
// import { setPassword } from '../actions/index'
import { Link } from 'react-router'
import classnames from 'classnames'


require ('./styles/welcome.scss')
const classes = classnames('welcome', {})

class WelcomePassword extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      password1: '',
      password2: '',
      match: false
    })

    this.onInput1Change = this.onInput1Change.bind(this)
    this.onInput2Change = this.onInput2Change.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  };

  formSubmit(props) {
    this.context.router.push('/')
  };

  onInput1Change(event) {
    const val = event.target.value;
    this.setState({ password1: event.target.value })
    if (val !== '' && this.state.password2 === val) {
      this.setState({match: true})
    } else {
      this.setState({match: false})
    }
  }

  onInput2Change(event) {
    const val = event.target.value;
    this.setState({ password2: val })
    if (val !== '' && this.state.password1 === val) {
      this.setState({match: true})
    } else {
      this.setState({match: false})
    }
  }

  formSubmit(props) {
    this.context.router.push('/welcome/theme')
  }

  render() {
    const { fields: {password1, password2}, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
        <h1>Step 1</h1>
          <h3>Welcome!</h3>
          <input
            type="password"
            placeholder="Enter a password."
            className="form-control"
            value={this.state.password1}
            onChange={this.onInput1Change}/>
          <br/>
          <input
            type="password"
            placeholder="Repeat your password."
            className="form-control"
            value={this.state.password2}
            onChange={this.onInput2Change}/>
          <button type="submit" className="btn btn-primary" disabled={this.state.match ? '':'disabled'}>Next</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'PasswordNewForm', //name of the form, doesn't have to be same as component
  fields: ['password1', 'password2'],
}, null, null)(WelcomePassword)
