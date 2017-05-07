/**
 * @author: faiz karim
 * @since: 02/05/17
 */


import {
  Linking,
  Platform,
} from 'react-native';

export const phoneCallUtil = function (phoneNumber) {
  let url;

  if (Platform.OS !== 'android') {
    url = 'telprompt:';
  }
  else {
    url = 'tel:';
  }

  url += phoneNumber;
  LaunchURL(url);
}


export const smsUtil = function (phoneNumber = null) {
  let url = 'sms:';
  url += phoneNumber;
  LaunchURL(url);
}

export const emailUtil = function (toEmailAddress) {
  let url = 'mailto:';
  url += toEmailAddress;

  LaunchURL(url);
}

const LaunchURL = function (url) {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      Linking.openURL(url)
        .catch(err => {
          if (url.includes('telprompt')) {
            // telprompt was cancelled and Linking openURL method sees this as an error
            // it is not a true error so ignore it to prevent apps crashing
            // see https://github.com/anarchicknight/react-native-communications/issues/39
          } else {
            console.warn('openURL error', err)
          }
        });
    }
  }).catch(err => console.warn('An unexpected error happened', err));
};
