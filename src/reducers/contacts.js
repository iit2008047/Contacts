/**
 * @author: faiz karim
 * @since: 30/04/17
 */

import {CONTACTS_FAILED, CONTACTS_LOADING, CONTACTS_LOADED, CONTACTS_UPDATED} from '../actions/actionTypes'
import update from 'immutability-helper';

const initialState = {
  ids: [],
  contactList: [],
  metadata: {
    isLoading: false,
    isFailed: false,
    hasUpdated: false
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTACTS_LOADED:
      return update(state, {
        contactList: { $set: action.contactArray },
        metadata: {
          isLoading: { $set: false },
          isFailed: { $set: false },
          hasUpdated: { $set: false },
        }
      });

    case CONTACTS_LOADING:
      return update(state, {
        metadata: {
          isLoading: { $set: true },
          isFailed: { $set: false },
          hasUpdated: { $set: false },
        }
      });

    case CONTACTS_FAILED:
      return update(state, {
        metadata: {
          isFailed: { $set: true },
          isLoading: { $set: false },
        }
      });

    case CONTACTS_UPDATED:
      return update(state, {
        metadata: {
          hasUpdated: { $set: true },
        }
      });
    default:
      return state
  }
}