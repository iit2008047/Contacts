/**
 * @author: faiz karim
 * @since: 29/04/17
 */

import RestClient from './nativeRestClient';
import environment from './environment';

export function getConfig() {
  const header = {};
  const baseUrl = environment.hostname;
  return {
    header,
    baseUrl
  };
}

const unauthorizedRequestInterceptor = (response, error, func) => {
  if (!error || error.status != 401) {
    return error ? Promise.reject(error) : Promise.resolve(response);
  }

  const agent = RestClient.create(() => {
      return { baseUrl: environment.hostname };
    }
  );

  const url = `${environment.refreshUrl}?accessToken=${encodeURIComponent(AUTH_TOKEN.value)}`;

  return agent.get(url)
    .then(authToken => {
      initializeAuthToken(authToken);
      LocalStorage.update(AUTH_STORE, { authToken });
    })
    .catch(error => {
      LOGOUT.fn && LOGOUT.fn()
    })
    .then(func);
};

export default RestClient.create(getConfig, unauthorizedRequestInterceptor);
