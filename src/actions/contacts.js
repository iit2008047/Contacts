/**
 * @author: faiz karim
 * @since: 29/04/17
 */

import contactService from './service/contacts'
import _ from 'lodash';
import {CONTACTS_FAILED, CONTACTS_LOADING, CONTACTS_LOADED} from './actionTypes'

export const CONTACTS_URL = '/contacts.json';

export const loadContacts = (dispatch) => {
  dispatch({
    type: CONTACTS_LOADING,
  });
  return contactService.loadContacts(CONTACTS_URL)
    .then(response => {
      dispatch({
        type: CONTACTS_LOADED,
        contactArray: response
      });
    }, (error) => {
      dispatch({
        type: CONTACTS_FAILED,
      });
    })
}