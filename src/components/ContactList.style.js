/**
 * @author: faiz karim
 * @since: 01/05/17
 */

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  viewStyle: {
    backgroundColor: '#ccc'
  },
  profileImageContainer: {
    height      : 46,
    width       : 46,
    borderColor : 'black',
    borderRadius: 23,
    borderWidth : 1,
    marginRight: 12
  },
  profileImage: {
    height: 44,
    width: 44,
  },
  profileCell: {
    padding: 20,
    flexDirection: 'row',
    alignItems:'center'
  },
  starContainer: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems:'flex-end'
  }
});