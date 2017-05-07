/**
 * @author: faiz karim
 * @since: 01/05/17
 */


import _ from 'lodash';
import React, {PropTypes} from 'react';
import DetailPane from './DetailPane'
import {connect} from 'react-redux';
import {getContactDetail} from '../../actions/contacts'

const makeMapStateToProps = () => {
  return ({contactDetail}, ownProps) => {
    const {ids, metadata} = contactDetail,
      item = ids && _.get(ids, `[${ownProps.id}]`);
    return {
      details: item,
      isLoading: metadata.isLoading,
      isFailed: metadata.isFailed
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadDetail() {
    getContactDetail(dispatch, ownProps.id);
  }
});


export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(DetailPane);
