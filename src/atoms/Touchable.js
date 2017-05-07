/**
 * @author: faiz karim
 * @since: 01/05/17
 */



import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const hitSlop = {right:15,left:15,top:10,bottom:10}

export default function Touchable({style, ...props}) {
  if(Platform.OS === 'android'){
    <TouchableNativeFeedback hitSlop={hitSlop} style={style}  {...props}/>
  }
  return <TouchableHighlight underlayColor={'transparent'}
    hitSlop={hitSlop}
    activeOpacity={0.6}
    style={style}  {...props}/>;
}
