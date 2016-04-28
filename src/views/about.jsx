'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { stateToHTML } from 'draft-js-export-html';
// import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
import { getFirebaseData, updateSingleFirebaseData, publishSite, addImage, updateFirebaseEntry } from '../actions/index';
// import { Editor, EditorState, RichUtils } from 'draft-js';
import InputText from '../components/InputText';
import RichEditor from '../components/RichEditor';
import classnames from 'classnames';

const classes = classnames('about', {});

require ('./styles/about.scss');

let About = React.createClass({
  getInitialState: function() {
    // let editorState = EditorState.createWithContent('test');
    // let editorState = EditorState.createWithContent(
    //   ContentState.createFromText('test!'));

    // EditorState.createWithContent(
    //   ContentState.createFromBlockArray(blocks),

    // this.onChange = (editorState) => this.setState({editorState});
    return ({editorState: null});
  },

  componentWillMount: function() {
    // this.props.initializeForm({name:'name'});
  },

  componentDidMount: function() {
    // this.props.getFirebaseData(this.props.user);
    console.log('props:', this.props);
    // let editorState = EditorState.createWithContent(
    //   // if (this.props.data.bio) {}
    //   ContentState.createFromText(this.props.data.bio));
    // this.onChange = (editorState) => this.setState({editorState});
    // this.setState({editorState: null});
  },

  formSubmit: function(entry) {
    // this.props.updateSingleFirebaseData(entry, this.props.user, '/data/notablework');
    console.log('entry:', entry);
    console.log('props:', this.props);
    // console.log('refTagline', this.refs.editorTagline.state.getCurrentContent());
    // console.log('refTagline', this.refs.tagline);
    /* entry props need to match up to the params that will be updated in firebase */
    /* regular form fields will be populated but rich text fields need to be assigned */
    entry.tagline = stateToHTML(this.refs.tagline.state.editorState.getCurrentContent());
    this.props.updateFirebaseEntry('data/aboutme', entry);
  },

  render: function() {
    const { fields, handleSubmit, dashboardData, entryKey, error, published, updated, user } = this.props;
    console.log('render props:', this.props);

    // if (!this.props.error && !this.props.dashboardData) {
    //   return (
    //     <div className={classes}>
    //       About Me
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>Loading...</div>
    //   )
    // }

    return (
      <div>
        <div>About Me</div>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <div className="form-group">
            <InputText
              field={fields.name}
              id='about-name'
              label={this.props.controlList.controls[1].label}
              placeholder=''
            />
          <h5>{this.props.controlList.controls[0].label}</h5>
          <p>{this.props.controlList.controls[0].help}</p>
          <h5>{this.props.controlList.controls[7].label}</h5>
          <RichEditor ref="bio" contentState={this.props.data.bio?this.props.data.bio:''} />
          <p>{this.props.controlList.controls[7].help}</p>
          <h5>{this.props.controlList.controls[6].label}</h5>
          <RichEditor ref="tagline" contentState={this.props.data.tagline?this.props.data.tagline:''} />
          <p>{this.props.controlList.controls[6].help}</p>
          </div>
          <button type="submit">Update Data</button>
        </form>
      </div>
    )
  }
});

function validate(values) {
  const errors = {};
  // if (!values.password) {
  //   errors.password = messages.error_password;
  // }
  // if (!values.password2) {
  //   errors.password2 = messages.error_password_repeat;
  // }
  // if (values.password2 && values.password !== values.password2) {
  //   errors.password2 = messages.error_password_match;
  // }
  return errors;
}

function MapStateToProps(state) {
  // console.log('state:', state);
  return {
    controlList: state.firebase.contentType.aboutme,
    data: state.firebase.data.aboutme,
    initialValues: state.firebase.data.aboutme,
    dashboardData: state.firebase.dashboardData,
    entryKey: state.firebase.key,
    error: state.firebase.error,
    published: state.publish.published,
    updated: state.firebase.updated,
    user: state.login.user
  };
}

About.propTypes = {
  // fields: PropTypes.object.isRequired
}

About = reduxForm({
  form: 'AboutForm', //name of the form, doesn't have to be same as component
  fields: ['name'],
  // fields,
  validate
},
MapStateToProps,
{ getFirebaseData, updateSingleFirebaseData, publishSite, addImage, updateFirebaseEntry })(About)

export default About;
