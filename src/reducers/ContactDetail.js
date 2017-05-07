/**
 * @author: faiz karim
 * @since: 02/05/17
 */

import {DETAIL_FAILED, DETAIL_LOADED, DETAIL_LOADING} from '../actions/actionTypes'
import update from 'immutability-helper';

const initialState = {
  ids:{},
  metadata: {
    isLoading: false,
    isFailed: false
  },
};



export default function (state = initialState, action) {
  switch (action.type) {
    case DETAIL_LOADED:
      return update(state, {
        ids: {
          [action.id]: { $set: action.item }
        },
        metadata: {
          isLoading: { $set: false },
          isFailed: { $set: false },
        }
      });

    case DETAIL_LOADING:
      return update(state, {
        ids: { $set: { [action.id]:{} }},
        metadata: {
          isLoading: { $set: true },
          isFailed: { $set: false },
        }
      });

    case DETAIL_FAILED:
      return update(state, {
        metadata: {
          isFailed: { $set: true },
          isLoading: { $set: false },
        }
      });
    default:
      return state
  }
}