'use strict';

import React, { PropTypes } from 'react';
import FormField from './FormField';
import classnames from 'classnames';
const classes = classnames('input-password', {});

require ('./styles/input.scss');

const InputPassword = React.createClass({
  propTypes: {
    field: PropTypes.object.isRequired
  },

  componentDidMount: function() {
    // console.log(this.props);
  },

  shouldComponentUpdate: FormField.shouldFormFieldUpdate,

  render: function() {
    const {field, label, onChange, ...inputProps} = this.props;
    return (
      <FormField field={field} inputProps={inputProps} label={label}>
        <input
          {...inputProps}
          className='form-control'
          name={field.name}
          onBlur={field.onBlur}
          onChange={onChange && field.onChange}
          type='password'
        />
      {/*<div className={classes}>
      <input type='text' placeholder={this.props.placeholder}/>
      </div>*/}
      </FormField>
    )
  }
});

export default InputPassword;
