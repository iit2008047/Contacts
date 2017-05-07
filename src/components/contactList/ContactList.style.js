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
    borderColor : 'white',
    borderRadius: 23,
    borderWidth : 1,
    marginRight: 12
  },
  profileImage: {
    height: 44,
    width: 44,
  },
  profileCell: {
    paddingVertical: 8,
    marginHorizontal: 18,
    flexDirection: 'row',
    alignItems:'center',
    borderBottomWidth: 1,
    borderColor:'#f0f0f0',
  },
  starContainer: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems:'flex-end'
  },
  centeringIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  sectionView:{
    backgroundColor: '#e8e8e8'
  },
  sectionText:{
    marginVertical: 5,
    marginLeft: 20,
    color: 'black',
    fontSize:14,
    fontWeight: '700',
  },
  profileName:{
    color: 'black',
    fontSize:14,
    fontWeight: '600',
  }
});