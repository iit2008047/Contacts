/**
 * @author: faiz karim
 * @since: 07/05/17
 */


import _ from 'lodash';
import React, {PropTypes} from 'react';
import EditContact from './EditContact'
import {connect} from 'react-redux';
import {editContact, addContact} from '../../actions/contacts'


const mapDispatchToProps = (dispatch, ownProps) => ({
  editProfile(data) {
    if (ownProps.id !== null) {
      editContact(dispatch, ownProps.id, data);
    } else {
      addContact(dispatch, data);
    }

  }
});


export default connect(
  null,
  mapDispatchToProps
)(EditContact);
