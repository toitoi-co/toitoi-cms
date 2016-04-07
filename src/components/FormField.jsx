import React, { PropTypes } from 'react';
import classnames from 'classnames';

const classes = classnames('input-text', {});
const FIELD_EVENT_HANDLER = /^(?:on|handle)[A-Z]/

/**
 * Perform shallow equals comparison of two redux-form field objects to
 * determine if the field has changed.
 */
function fieldShallowEquals(field, nextField) {
  for (var prop in field) {
    // Ignore event handlers, as they continually get recreated by redux-form
    if (!FIELD_EVENT_HANDLER.test(prop) && field[prop] !== nextField[prop]) {
      return false
    }
  }
  return true
}

/**
 * Perform shallow equals comparison to determine if the props of the context
 * form field component have changed, with special-case handling for the "field"
 * prop, provided by redux-form.
 * Use this as shouldComponentUpdate() on components which compose a
 * FormField in their render() method and they will only re-render when
 * necessary.
 */
function shouldFormFieldUpdate(nextProps) {
  var keys = Object.keys(this.props)
  var nextKeys = Object.keys(nextProps)
  if (keys.length !== nextKeys.length) return true
  var nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!nextHasOwnProperty(key) ||
        key === 'field' ? !fieldShallowEquals(this.props[key], nextProps[key])
                        : this.props[key] !== nextProps[key]) {
      return true
    }
  }
  return false
}

/**
 *
 * This component manages:
 * - Bootstrap structure and classes
 * - A <Label> for the field
 * - Validation error style and display
 *
 * The form input itself should be passed as content.
 */

const FormField = React.createClass({
  statics: {
    shouldFormFieldUpdate
  },
  propTypes: {
    // A redux-form field object
    field: PropTypes.object,
    // An additional class to be applied to the input container
    inputClass: PropTypes.string,
    // Props used for the input (id is used to link the label to the input)
    inputProps: PropTypes.object,
    // Label text
    label: PropTypes.string,
    // Loading state
    loading: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      field: {},
      inputProps: {}
    }
  },
  render: function() {
    const {field, inputClass, inputProps, label} = this.props
    const error = field.touched && field.error
    return (
      <div className={classnames('form-group', {'has-error': error})}>
        <div className="control-label">
          <label htmlFor={inputProps.id}>{label}</label>
        </div>
        <div className={inputClass}>
          {this.props.children}
          {error && <p className="help-block" style={{marginBottom: 0}}>{error}</p>}
        </div>
      </div>
    )
  }
})

export default FormField;
