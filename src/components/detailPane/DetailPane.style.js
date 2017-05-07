/**
 * @author: faiz karim
 * @since: 01/05/17
 */


import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1
  },
  basicInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageContainer: {
    height: 82,
    width: 82,
    borderColor: 'white',
    borderRadius: 41,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  profileImage: {
    height: 80,
    width: 80,
  },
  contactName: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
    marginBottom: 15,
  },
  infoActionContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  infoCircularView: {
    height: 44,
    width: 44,
    borderColor: 'white',
    borderRadius: 22,
    borderWidth: 1,
    marginRight: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#50e3c2',
  },
  iconTextStyle: {
    backgroundColor: 'transparent',
  },
  detailItemView: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  headerView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  valueView: {
    flex: 3,
    marginLeft: 16
  },
  headerText: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: 'grey',
  },
  valueText: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: 'black',
  },
  backIcon: {
    marginRight: 3
  },
  backButtonContainer: {
    flexDirection: 'row',
  },
  centeringIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  navigationText: {
    color: '#50e3c2',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '500',
  }
})