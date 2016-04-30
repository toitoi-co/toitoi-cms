'use strict';

import React, { PropTypes } from 'react';
import FormField from './FormField';
import classnames from 'classnames';

const classes = classnames('input-text', {});

require ('./styles/input.scss');

const InputText = React.createClass({
  propTypes: {
    field: PropTypes.object.isRequired
  },

  shouldComponentUpdate: FormField.shouldFormFieldUpdate,

  render: function() {
    // const {field, label, onChange, ...inputProps} = this.props;
    const {field, label, onChange, ...inputProps, ...rest} = this.props;
    return (
      <FormField field={field} inputProps={inputProps} label={label}>
        <input
          {...field}
          {...rest}
          type='text'
        />
      {/*{...inputProps}
      className='form-control'
      name={field.name}
      onBlur={field.onBlur}
      onChange={onChange && field.onChange}*/}
      {/*<div className={classes}>
      <input type='text' placeholder={this.props.placeholder}/>
      </div>*/}
      </FormField>
    )
  }
});

InputText.propTypes = {
  field: PropTypes.object.isRequired
}

export default InputText;
