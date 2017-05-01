/**
 * @author: faiz karim
 * @since: 29/04/17
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import contactStore from './reducers'
import App from './components/app'

let store = createStore(contactStore)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }

}
AppRegistry.registerComponent('contacts', () => Root);