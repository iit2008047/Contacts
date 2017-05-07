/**
 * @author: faiz karim
 * @since: 29/04/17
 */
import Ajax from '../../ajax';

const handleAction = (urlOrParams, method, requestData) => Ajax[method](urlOrParams, requestData);

function buildLoadContactsReqParams(url, data, params) {
  const reqParams = { url, data };
  return reqParams;
}


export default {
  loadContacts: (url, data, params = {}) => handleAction(buildLoadContactsReqParams(url, data, params), 'get'),
  loadDetail: (url, data, params = {}) => handleAction(buildLoadContactsReqParams(url, data, params), 'get'),
  updateContact: (url, data, params = {}) => handleAction(buildLoadContactsReqParams(url, data, params), 'put'),
  addContact: (url, data, params = {}) => handleAction(buildLoadContactsReqParams(url, data, params), 'post'),

}