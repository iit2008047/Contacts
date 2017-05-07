/**
 * @author: faiz karim
 * @since: 01/05/17
 */


import React, { Component } from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator
} from 'react-native';
import Touchable from'../../atoms/Touchable'
import Styles from './DetailPane.style'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';
import {phoneCallUtil, smsUtil, emailUtil} from '../../utils/communicationsUtils'
import { Actions } from 'react-native-router-flux';

import placeholder_photo from '../../img/placeholder_photo.png'


class DetailPane extends Component {

  constructor(props) {
    super(props);

    Actions.refresh({
      renderBackButton: this._renderBackButton,
      renderRightButton: this._renderRightButton,
    });
  }

  componentDidMount() {
    const {loadDetail} = this.props;
    loadDetail();
  }

  _renderBackButton = () => {
    return (
      <Touchable onPress={this._onBackPress}>
        <View style={Styles.backButtonContainer}>
          <IconIonicons name="back" style={Styles.backIcon} size={20} color='#50e3c2'/>
          <Text>{'Contacts'}</Text>
        </View>
      </Touchable>
    );
  }

  _renderRightButton = () => {
    return (
      <Touchable onPress={this._onEditPressed.bind(this)}>
        <View>
          <Text>{'Edit'}</Text>
        </View>
      </Touchable>
    );
  }

  _onBackPress = () => {
    Actions.pop();
  }

  _onEditPressed() {
    Actions.EditContact({ id: this.props.id, details: this.props.details });
  }

  render() {
    const {details, isLoading} = this.props;

    if (isLoading) {
      return this._renderLoader();
    }


    return (
      <View style={Styles.container}>
        <LinearGradient colors={['#F7FBFA','#EDF9F6', '#E0F7F2', '#DEF6F0']} style={Styles.basicInfoContainer}>
          {details && this._renderBasicInfo()}
          {details && this._renderActionInfo()}
        </LinearGradient>
        {details && this._renderContactDetails()}
      </View>
    )
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

  _renderBasicInfo() {
    const {first_name, last_name, profile_pic} = this.props.details;

    const profileSource = profile_pic === '/images/missing.png' ? placeholder_photo : { uri: profile_pic };

    return (
      <View>
        <View style={Styles.profileImageContainer}>
          <Image style={Styles.profileImage} source={profileSource}/>
        </View>
        <Text style={Styles.contactName}>{first_name + last_name}</Text>
      </View>
    )

  }

  _renderActionInfo() {

    const {phone_number, email, favorite} = this.props.details;
    return (
      <View style={Styles.infoActionContainer}>
        <View style={Styles.infoCircularView}>
          <IconEntypo name="message" size={20} color="white" style={Styles.iconTextStyle}/>
        </View>
        <View style={Styles.infoCircularView}>
          <Icon name="phone" size={20} color="white" style={Styles.iconTextStyle}/>
        </View>
        <View style={Styles.infoCircularView}>
          <IconEntypo name="mail" size={20} color="white" style={Styles.iconTextStyle}/>
        </View>
        <View style={[Styles.infoCircularView, {backgroundColor: 'white'},]}>
          <IconEntypo name={favorite? 'star' : 'star-outlined'} size={20} color={favorite? '#50e3c2' : 'black'}
            style={Styles.iconTextStyle}/>
        </View>
      </View>
    )
  }

  _renderContactDetails() {
    const {email, phone_number} = this.props.details;
    return (
      <View>
        {this._renderItems('mobile', phone_number)}
        {this._renderItems('email', email)}
      </View>
    )
  }

  _renderItems(header, value) {
    return (
      <View style={Styles.detailItemView}>
        <View style={Styles.headerView}>
          <Text style={Styles.headerText}>{header}</Text>
        </View>
        <View style={Styles.valueView}>
          <Text style={Styles.valueText}>{value}</Text>
        </View>
      </View>
    )
  }

}

export default DetailPane;