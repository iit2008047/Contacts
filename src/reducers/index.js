/**
 * @author: faiz karim
 * @since: 30/04/17
 */


import {combineReducers} from 'redux';
import contacts from './contacts';
import contactDetail from './contactDetail';


export default combineReducers({
  contacts,
  contactDetail
});