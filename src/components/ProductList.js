import _ from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { productesFetch, filterFetchWebSerivice } from '../actions';
import ListItem from './ListItem';

class ProductList extends Component {
  componentWillMount() {
    // we have to provide some data here based on defualt filter

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ productes }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(productes);
  }

  renderRow(product) {
    return <ListItem product={product} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const numberOfRecord=state.productes.NumOfRecords;
  const productes = _.map(state.productes.ResultAds, (val, uid) => {
    return { ...val, uid };
  });

  return { productes };
};

export default connect(mapStateToProps, { productesFetch, filterFetchWebSerivice})(ProductList);
