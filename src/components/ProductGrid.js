'use strict';

import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	PickerIOS,
	ScrollView,
	StyleSheet
} from 'react-native';
import _ from 'lodash';
import product from "./Styles/product";
import Toolbar from './common/Toolbar';
import {Actions} from 'react-native-router-flux';
import css from "./Styles/style";
import AppEventEmitter from '../Services/AppEventEmitter';
import { connect } from 'react-redux';
import { productesFetch, filterFetchWebSerivice } from '../actions';
//import FooterTabs from './common/FooterTabs';

import {ListView, GridRow} from '@shoutem/ui';
import ListItemGrid from './ListItemGrid';


class ProductGrid extends Component {

	open () {
        AppEventEmitter.emit('hamburger.click');
    }

renderRow(productes) {

	// data contains grouped data for one row,
  // so we need to remap it into cells and pass to GridRow
 	const cellViews = _.map(productes, (item) => {
		console.log(item);
			return (
				    <ListItemGrid productInfo={item} />
				  );

				});

	return (
	  <GridRow columns={2}>
	    {cellViews}
	  </GridRow>
	  );


		}


	render() {
		const groupedData = GridRow.groupByRows(this.props.productes, 2)

		return (
			<View style={product.color}>
				<Toolbar name="لیست آگهی ها" gridButton={true} heartButton={true} />
					<ListView
       				data={groupedData}
       				renderRow={this.renderRow}
     				/>
			</View>
		);
	}
}


const mapStateToProps = state => {
  const numberOfRecord=state.productes.NumOfRecords;
  const productes = state.productes.ResultAds;
  return { productes };
};

export default connect(mapStateToProps, { productesFetch, filterFetchWebSerivice})(ProductGrid);
