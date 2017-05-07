/**
 * @author: faiz karim
 * @since: 30/04/17
 */


import _ from 'lodash';
import React, {PropTypes} from 'react';
import ContactList from './ContactList'
import {connect} from 'react-redux';
import {loadContacts} from '../../actions/contacts'

const makeMapStateToProps = () => {
  return (state, ownProps) => {
    const {contacts} = state,
      {metadata} = contacts;
    return {
      contactList: _.sortBy(contacts.contactList, 'first_name'),
      isLoading: metadata.isLoading,
      isFailed: metadata.isFailed,
      hasUpdated: metadata.hasUpdated
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadContacts(stream, params = {}) {
    loadContacts(dispatch);
  }
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ContactList);
