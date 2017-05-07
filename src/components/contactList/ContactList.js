/**
 * @author: faiz karim
 * @since: 30/04/17
 */

import React, { Component } from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import Touchable from'../../atoms/Touchable'
import Icon from 'react-native-vector-icons/FontAwesome';

import StickySearchList from '../../atoms/ListView'
import {Actions} from 'react-native-router-flux';

import emptyProfileImage from '../../img/empty-profile.png'

import Styles from './ContactList.style'


function senetizeContactList(list) {
  let _channelAccounts = {},
    arrayItem = [];


  _.forEach(list, (item) => {
    const firstName = _.get(item, 'first_name');
    const arraySection = firstName[0].toUpperCase();
    if (!_channelAccounts[arraySection]) {
      _channelAccounts[arraySection] = [];
    }
    _channelAccounts[arraySection].push(item);
  });

  _.forEach(_channelAccounts, function (value, key) {
    arrayItem.push({ [key]: value });
  });
  return arrayItem;
}

class ContactList extends Component {

  static displayName = 'ContactList';

  componentDidMount() {
    const {loadContacts} = this.props;
    loadContacts();
  }

  componentWillReceiveProps(nextProps) {
    const {hasUpdated, loadContacts} = this.props;
    hasUpdated && loadContacts();
  }

  render() {

    const {contactList, isLoading, isFailed} = this.props;

    if (isLoading) {
      return this._renderLoader();
    }

    const groupedData = senetizeContactList(contactList);

    return (
      <StickySearchList
        data={groupedData}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }

  _renderRow(data, sectionID, rowID, highlightRow) {

    return (
      <View>
        <Text style={{ fontSize: 22 }}>{_.keys(data)[0]}</Text>
        <View>
          {_.map(_.values(data)[0], (item) => this.renderItem(item))}
        </View>
      </View>
    )
  }

  renderItem(item) {
    const {first_name, last_name, profile_pic, favorite, id} = item;

    const profileSource = profile_pic === '/images/missing.png' ? emptyProfileImage : { uri: profile_pic };
    return (
      <Touchable onPress={_.partial(this._onContactPress, id)}>
        <View style={Styles.profileCell}>
          <View style={Styles.profileImageContainer}>
            <Image style={Styles.profileImage} source={profileSource}/>
          </View>
          <Text>{first_name + last_name}</Text>
          <View style={Styles.starContainer}>
            {favorite && <Icon name="star" size={20} color="#50e3c2"/>}
          </View>

        </View>
      </Touchable>

    );
  }

  _onContactPress(id) {
    Actions.DetailPane({ id });
  }

  _renderLoader() {
    return (
      <View style={Styles.centeringIndicator}>
        <ActivityIndicator
          animating={true}
          style={[Styles.centeringIndicator, {height: 80}]}
          size="large"
        />
      </View>
    )
  }
}

export default ContactList;