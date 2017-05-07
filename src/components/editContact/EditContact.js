/**
 * @author: faiz karim
 * @since: 04/05/17
 */


import React, { Component } from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  ListView,
  Image,
  TextInput
} from 'react-native';
import Touchable from'../../atoms/Touchable'
import Styles from './EditContact.style'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';
import {phoneCallUtil, smsUtil, emailUtil} from '../../utils/communicationsUtils'
import { Actions } from 'react-native-router-flux';

import placeholder_photo from '../../img/placeholder_photo.png'
import camera_button from '../../img/camera_button.png'

class DetailPane extends Component {

  constructor(props) {
    super(props);

    const {profile_pic, first_name, last_name, email, phone_number} = props.details;
    this.state = {
      profile_pic,
      first_name,
      last_name,
      email,
      phone_number
    };

    Actions.refresh({
      renderBackButton: this._renderBackButton,
      renderRightButton: this._renderRightButton,
    });
  }

  _renderBackButton = () => {
    return (
      <Touchable onPress={this._onCancelPress}>
        <View style={Styles.backButtonContainer}>
          <Text>{'Cancel'}</Text>
        </View>
      </Touchable>
    );
  }

  _renderRightButton = () => {
    return (
      <Touchable onPress={this._onDonePressed.bind(this)}>
        <View>
          <Text>{'Done'}</Text>
        </View>
      </Touchable>
    );
  }

  _onCancelPress = () => {
    Actions.pop();
  }

  _onDonePressed() {
    const {editProfile} = this.props;
    let {details} = this.props;
    details = _.assign(details, {...this.state});
    editProfile && editProfile(details)
    Actions.pop();
  }

  render() {
    const {details} = this.props;
    return (
      <View style={Styles.container}>
        <LinearGradient colors={['#F7FBFA','#EDF9F6', '#E0F7F2', '#DEF6F0']} style={Styles.basicInfoContainer}>
          {details && this._renderProfileImagePlaceHolder()}
        </LinearGradient>
        {details && this._renderContactDetails()}
      </View>
    )
  }

  _renderProfileImagePlaceHolder() {
    const {profile_pic} = this.state;

    const profileSource = profile_pic === '/images/missing.png' ? placeholder_photo : { uri: profile_pic };

    return (
      <View>
        <View >
          <View style={Styles.profileImageContainer}>
            <Image style={Styles.profileImage} source={profileSource}/>
          </View>
          <View style={Styles.cameraView}>
            <Image style={Styles.cameraImage} source={camera_button}/>
          </View>
        </View>
      </View>
    )

  }

  _renderContactDetails() {
    const {first_name, last_name, email, phone_number} = this.state;
    return (
      <View>
        {this._renderItems('First Name', 'first_name', first_name)}
        {this._renderItems('Last Name', 'last_name', last_name)}
        {this._renderItems('mobile', 'phone_number', phone_number)}
        {this._renderItems('email', 'email', email)}
      </View>
    )
  }

  _renderItems(header, key, value) {
    return (
      <View style={Styles.detailItemView}>
        <View style={Styles.headerView}>
          <Text style={Styles.headerText}>{header}</Text>
        </View>
        <TextInput
          placeholder={header}
          value={value}
          style={Styles.valueView}
          onChangeText={_.partial(this.onTextChange. bind(this), key)}
          editable={true}
        />
      </View>
    )
  }

  onTextChange(key, value) {
    this.setState({ [key]: value });
  }

}

export default DetailPane;