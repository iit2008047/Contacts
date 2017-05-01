/**
 * @author: faiz karim
 * @since: 01/05/17
 */

import {Scene, Router} from 'react-native-router-flux';
import React, { Component } from 'react';
import ContactList from '../contactList'

class App extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="ContactList" component={ContactList} title="Contact"/>
      </Scene>
    </Router>
  }
}

export default App;