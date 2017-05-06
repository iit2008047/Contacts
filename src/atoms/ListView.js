/**
 * @author: faiz karim
 * @since: 01/05/17
 */

//Native Libraries
import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { ListView as RNListView, RecyclerViewBackedScrollView, ActivityIndicator, RefreshControl, Platform, Loader, Text, Image, Touchable, View, ScrollView } from 'react-native';

//Components
import {Theme, Loader, Text, Image, Touchable, View, ScrollView} from 'native-blocks'
import { EmptyMessageView } from 'native-components';

//resources
import emptyContentImage from 'app/img/native/dst_empty_content.png';

//Constants
import {NO_INTERNET_ERROR, NO_INTERNET_VIEW} from 'lite-app/constants/nativeConstants'

//Styles
import styles from './ListView.style';

const DefaultListConfig = {
  initialListSize: 4,
  pageSize: 1,
  scrollRenderAheadDistance: 500,
};

function cloneWithData(dataSource: RNListView.DataSource, data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

function viewHasChanged(v1, v2) {
  return v1 !== v2;
}

class ListView extends Component {

  static defaultProps = {
    mode: 'normal',
    shouldShowSeparator: true,
    enableCardView: true,
    enablePullToRefresh: false,
    emptyView: ({text: 'No data found', image: emptyContentImage}),
    errorView: ({text: 'Failed to load', image: emptyContentImage}),
    isImmutableData: true
  };

  constructor(props) {
    super(props);

    const { data } = this.props;
    const dataSource = new RNListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: viewHasChanged,
      sectionHeaderHasChanged: viewHasChanged
    });
    this.state = {
      dataSource: cloneWithData(dataSource, data)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isImmutableData) {
      const ds = new RNListView.DataSource({
        getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
        getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
        rowHasChanged: viewHasChanged,
        sectionHeaderHasChanged: viewHasChanged
      });
      this.setState({ dataSource: cloneWithData(ds, nextProps.data) });
    } else if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data),
      });
    }
  }

  render() {
    switch (this.props.mode) {
      case 'loading':
        return this._renderLoader();
      case 'error':
        return this._renderError();
      case 'normal':
      case 'pullToRefresh':
      case 'loadMore':
      default:
        return this._renderList();
    }
  }

  _renderList = () => {
    const rowAndSectionCount = this.state.dataSource.getRowAndSectionCount();
    if (rowAndSectionCount === 1) {
      return this._renderEmpty();
    }

    const { props } = this;
    const { renderRow, renderSectionHeader, style, shouldShowSeparator, renderHeader, onEndReached, enableCardView, enablePullToRefresh } = props;
    const backgroundColor = Platform.OS == 'ios' ? ( enableCardView ? Theme.listView.backgroundColorCard : Theme.listView.backgroundColorNormal) : {};
    return (
      <RNListView
        ref="listview"
        style={[styles.listView, {backgroundColor}, style]}
        dataSource={this.state.dataSource}
        renderRow={renderRow}
        renderSectionHeader={renderSectionHeader}
        initialListSize={DefaultListConfig.initialListSize}
        pageSize={DefaultListConfig.pageSize}
        removeClippedSubviews
        scrollRenderAheadDistance={DefaultListConfig.scrollRenderAheadDistance}
        enableEmptySections
        renderSeparator={shouldShowSeparator ? this._renderSeparator : _.noop}
        renderHeader={renderHeader}
        renderScrollComponent={prop => <RecyclerViewBackedScrollView {...prop} />}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps
        onEndReached={onEndReached}
        renderFooter={this._renderFooter}
        refreshControl={enablePullToRefresh && this._renderRefreshControl()}
        {...props}/>
    );
  };

  _renderLoader = () => {
    return (
      <View style={styles.loadingContainer}>
        <Loader />
      </View>
    );
  };

  _renderError = () => {
    const {errorView} = this.props,
      {errorMessage} = errorView;
    let errorViewObject;
    switch(errorMessage){
      case NO_INTERNET_ERROR:
        errorViewObject = NO_INTERNET_VIEW;
        break;
      default:
        errorViewObject = errorView;
        break;
    }

    const {title, description, image} = errorViewObject;
    const {retryFunc} = this.props.errorView;

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <EmptyMessageView containerStyle={styles.errorContainer}
          image={image}
          title={title}
          message={description}
          retryFunc={retryFunc}/>
      </ScrollView>
    );
  };

  _renderEmpty = () => {
    const {title, description, image, retryFunc} = this.props.emptyView;
    return (
      <EmptyMessageView containerStyle={styles.errorContainer}
        image={image}
        title={title}
        message={description}
        retryFunc={retryFunc}/>
    );
  };

  _renderRefreshControl = () => {
    const {mode, onPullToRefresh} = this.props;
    return (
      <RefreshControl
        style={styles.refreshControl}
        tintColor={Theme.text.textLight}
        refreshing={mode == 'pullToRefresh'}
        onRefresh={onPullToRefresh}
      />
    );
  };

  _renderFooter = () => {
    if (this.props.mode == 'loadMore') {
      return <ActivityIndicator style={{ paddingVertical: 10}} size={'small'}/>;
    }
    return <View/>;
  };

  _renderSeparator = (sectionID, rowID) => {
    const separatorStyle = this.props.enableCardView ?
      [styles.separatorCard, { backgroundColor: Theme.listView.backgroundColorCard }] :
      [styles.separatorNormal, { backgroundColor: Theme.colors.separator }];

    return (
      <View key={`${sectionID}-${rowID}`} style={separatorStyle}/>
    );
  }

  _scrollTo = ({rowId, sectionId, rowHeight, sectionHeight, listHeight}) => {

    const {data} = this.props;
    let rowsToScroll = 0, sectionsToScroll = 0, scrollPosition = 0;

    if (typeof data == 'array') {
      for (rowItem in data) {
        if (rowId == rowItem.id) {
          break;
        }
        rowsToScroll++;
      }
    }

    if (typeof data == 'object') {
      for (sectionItem in data) {
        if (sectionItem == sectionId) {
          break;
        }
        sectionsToScroll++;

        for (rowItem in data[sectionItem]) {
          if (rowId == data[sectionItem][rowItem].id) {
            break;
          }
          rowsToScroll++;
        }
      }
    }

    scrollPosition = (rowsToScroll * rowHeight) + (sectionsToScroll * sectionHeight);

    if (!rowId && !sectionId) {
      scrollPosition = scrollPosition - listHeight;
    }
    this.refs.listview.scrollTo({ y: scrollPosition });
  };
}

ListView.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  renderRow: PropTypes.func.isRequired,
  renderHeader: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  style: PropTypes.object,

  onEndReached: PropTypes.func,
  onPullToRefresh: PropTypes.func,

  mode: PropTypes.oneOf(['normal', 'pullToRefresh', 'loadMore', 'loading', 'error']).isRequired,

  emptyView: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.object,
    retryFunc: PropTypes.func
  }),
  errorView: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.object,
    retryFunc: PropTypes.func
  }),

  enablePullToRefresh: PropTypes.bool,
  shouldShowSeparator: PropTypes.bool,
  enableCardView: PropTypes.bool,

};

export default ListView;
