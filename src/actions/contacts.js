/**
 * @author: faiz karim
 * @since: 29/04/17
 */

import contactService from './service/contacts'
import _ from 'lodash';
import {CONTACTS_FAILED,
  CONTACTS_LOADING,
  CONTACTS_LOADED,
  DETAIL_LOADING,
  DETAIL_LOADED,
  DETAIL_FAILED,
  CONTACTS_UPDATED,
} from './actionTypes'

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

export const getContactDetail = (dispatch, id) => {
  dispatch({
    type: DETAIL_LOADING,
    id
  });

  const detailUrl = `/contacts/${id}.json`
  return contactService.loadDetail(detailUrl)
    .then(response => {
      dispatch({
        type: DETAIL_LOADED,
        item: response,
        id
      });
    }, (error) => {
      dispatch({
        type: DETAIL_FAILED,
      });
    })
}

export const editContact = (dispatch, id, data) => {

  dispatch({
    type: DETAIL_LOADING,
    id
  });

  const detailUrl = `/contacts/${id}.json`
  return contactService.updateContact(detailUrl, data)
    .then(response => {

      dispatch({
        type: CONTACTS_UPDATED,
      });

      dispatch({
        type: DETAIL_LOADED,
        item: response,
        id
      });

    }, (error) => {
      dispatch({
        type: DETAIL_FAILED,
      });
    })
}