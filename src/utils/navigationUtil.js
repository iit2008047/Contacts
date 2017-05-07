/**
 * @author: faiz karim
 * @since: 07/05/17
 */

import Styles from './navigationUtil.style'
import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import Touchable from'../atoms/Touchable';

export const TextButton = (props) => {
  return (
    <Touchable disabled={props.isDisabled || false} onPress={()=>{
      props.onPress && props.onPress();
      props.shouldPop && popScene();
  }}>
      <View>
        <Text style={Styles.navigationText}>{props.text}</Text>
      </View>
    </Touchable>
  )
};