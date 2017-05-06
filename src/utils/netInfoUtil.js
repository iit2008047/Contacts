/**
 * @author: faiz karim
 * @since: 29/04/17
 */


import { NetInfo, Platform } from 'react-native';

const NET_INFO = {};

export default {

  init(){
    NetInfo.isConnected.addEventListener('netInfoEvent', handleConnectivityChange);
  },

  isInternetConnected(){
    return NET_INFO.isConnected;
  },

  deinit(){
    NetInfo.isConnected.removeEventListener('netInfoEvent', handleConnectivityChange);
  }

}

function handleConnectivityChange(isConnected) {
  NET_INFO.isConnected = isConnected;
}
