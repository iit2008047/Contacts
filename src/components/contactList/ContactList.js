/**
 * @author: faiz karim
 * @since: 30/04/17
 */

import React, { Component } from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlphabetListView from 'react-native-alphabetlistview';
import emptyProfileImage from '../img/empty-profile.png'

import Styles from './ContactList.style'


function senetizeContactList(list) {
  let _channelAccounts = {};

  _.forEach(list, (item) => {
    const firstName = _.get(item, 'first_name');
    const arraySection = firstName[0].toUpperCase();
    if (!_channelAccounts[arraySection]) {
      _channelAccounts[arraySection] = [];
    }
    _channelAccounts[arraySection].push(item);
  });
  return _channelAccounts;
}

class Cell extends Component {
  render() {
    const {first_name, last_name, profile_pic, favorite} = this.props.item;

    const profileSource = profile_pic === '/images/missing.png' ? emptyProfileImage : {uri: profile_pic};
    return (
      <View style={Styles.profileCell}>
        <View style={Styles.profileImageContainer}>
          <Image style={Styles.profileImage}  source={profileSource}/>
        </View>
        <Text>{first_name + last_name}</Text>
        <View style={Styles.starContainer}>
          {favorite && <Icon name="star" size={20} color="#4F8EF7" />}
        </View>

      </View>
    );
  }
}

class SectionHeader extends Component {
  render() {
    return (
      <View style={Styles.viewStyle}>
        <Text style={Styles.textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <View>
        <Text style={{color:'#f00'}}>{this.props.title}</Text>
      </View>
    );
  }
}

class ContactList extends Component {

  static displayName = 'ContactList';

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadContacts} = this.props;
    loadContacts();
  }

  render() {

    const {contactList, isLoading, isFailed} = this.props;

    const groupedData = senetizeContactList(contactList);
    return (
      <AlphabetListView
        data={groupedData}
        cell={Cell}
        cellHeight={50}
        sectionListItem={SectionItem}
        sectionHeader={SectionHeader}
        sectionHeaderHeight={50}
      />
    );
  }
}

export default ContactList;