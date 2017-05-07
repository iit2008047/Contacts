/**
 * @author: faiz karim
 * @since: 01/05/17
 */

import {Scene, Router} from 'react-native-router-flux';
import React, { Component } from 'react';
import ContactList from '../contactList'
import DetailPane from '../detailPane'
import EditContact from '../editContact'

import Styles from './App.style'

class App extends Component {
  render() {
    return <Router getSceneStyle={getSceneStyle} navigationBarStyle={Styles.navigationBar}>
      <Scene key="root">
        <Scene key="ContactList" component={ContactList} title="Contact"/>
        <Scene key="DetailPane" component={DetailPane} title=""/>
        <Scene key="EditContact" component={EditContact} title=""/>
      </Scene>
    </Router>
  }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#F6F6F6',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
  }
  return style;
};

export default App;