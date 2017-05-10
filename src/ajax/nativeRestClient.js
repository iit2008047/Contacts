/**
 * @author: faiz karim
 * @since: 29/04/17
 */

import _, {
  get as _get,
} from 'lodash';
import { NetInfoUtil } from '../utils/netInfoUtil';
import request from 'superagent-bluebird-promise';

const DEFAULT_PARAMS = {
  type: 'application/json; charset=utf-8',
  Connection: 'keep-alive'
};

const NO_INTERNET_ERROR = 'NO_INTERNET_ERROR';
const RESPONSE_TIMEOUT = 60000;

_addAttachments = (req, data) => {
  req.attach('file', data.file);
},

  _parseParams = (method, url, queryOrData, {headers, isAbsolutePath, type, timeout,  ...extraPrams} = {}) => {
    const params = {
      url,
      method,
      headers,
      isAbsolutePath,
      type,
      timeout,
      ...extraPrams
    };

    if (method === 'get') {
      params.query = queryOrData;
    } else {
      params.data = queryOrData;
    }

    return _.assign(params, _.isPlainObject(url) && url);
  },

  sendRequest = (getConfig, params, interceptor) => {
    const {method, url, query, data, type, headers, accept, attachment, timeout, isAbsolutePath} = params,
      processedUrl = isAbsolutePath ? url : `${getConfig().baseUrl}${url}`,
      req = request[method](processedUrl),
      reqHeaders = Object.assign({}, getConfig().header, headers);

    if (attachment) {
      _addAttachments(req, data);
    } else {
      req.type(type || DEFAULT_PARAMS.type);
    }

    req.accept(accept || DEFAULT_PARAMS.accept).query(query);
    if (data && !attachment) {
      req.send(data);
    }
    req.set(reqHeaders);

    req.timeout(timeout || RESPONSE_TIMEOUT);

    let _reject;
    const promise = new Promise((resolve, reject) => {
      _reject = reject;

      //1- check internet connection
      !NetInfoUtil.isInternetConnected() && reject(NO_INTERNET_ERROR);

      //2- execute request
      req.end((error, response) => {
        if (error) {
          reject(_get(error.response, 'body'));
        }
        //3- pass through interceptors if exist
        if (interceptor) {
          const callbackFunc = _.partial(sendRequest, getConfig, params, null);
          interceptor(response, error, callbackFunc)
            .then(response =>
              resolve(response.body || response.text || response)
            )
            .catch(error =>
              reject(_get(error.response, 'body.message') || _get(error.response, 'error'))
            );
        }
        else {
          onRequestCompleted(resolve, reject, response, error);
        }
      });

    });

    promise.abort = function () {
      req.abort();
      _reject({type: 'ABORT'});
    };

    return promise;
  };

onRequestCompleted = (resolve, reject, response, error) => {
  if (!error) {
    resolve(response.body || response.text || response);
  } else {
    reject(_get(error.response, 'error'));
  }
};

const AJAX = (getConfig, interceptor) => ({

  get(url, query, params) {
    return sendRequest(getConfig, _parseParams('get', url, query, params), interceptor);
  },

  post(url, data, params) {
    return sendRequest(getConfig, _parseParams('post', url, data, params), interceptor);
  },

  put(url, data) {
    return sendRequest(getConfig, _parseParams('put', url, data), interceptor);
  },

  remove(url) {
    return sendRequest(getConfig, _parseParams('del', url), interceptor);
  }

});

export default {
  create(getConfig, interceptor) {
    return AJAX(getConfig, interceptor);
  },
};
