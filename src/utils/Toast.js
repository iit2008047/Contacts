/**
 * @author: faiz karim
 * @since: 07/05/17
 */

import React, { PropTypes } from 'react';
import Toast from 'react-native-root-toast';
import _ from 'lodash';

function showToast(message) {
  if (_.isString(message)) {
    const toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    setTimeout(() => {
      Toast.hide(toast);
    }, 2000);
  }
}

export default {showToast};
