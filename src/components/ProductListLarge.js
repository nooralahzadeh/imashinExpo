'use strict';

import React, {Component} from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import {filterFetchWebSerivice } from '../actions';

import {
    ListView,
    TextInput,
    RefreshControl,
    Text,
    Animated,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from "react-native";

import {Actions} from "react-native-router-flux";
import css from "./Styles/style";
import product from "./Styles/product";
import Toolbar from "./common/Toolbar";
import AppEventEmitter from "../Services/AppEventEmitter";
import ListItemLarge from './ListItemLarge';
//import FooterTabs from './common/FooterTabs';


var offset = 0;
var alpha = 100;
var beta = 50;

class ProductListLarge extends Component {

  open() {
      AppEventEmitter.emit('hamburger.click');
  }

  componentWillMount() {
    // we have to provide some data here based on defualt filter
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

    constructor(props) {
        super(props);
        this.state = {
            _animatedMenu: new Animated.Value(0),
            isRefreshing: false
        }
    }

    hideMenu() {
        Animated.spring(this.state._animatedMenu, {
            toValue: -120
        }).start();
    }

    showMenu() {
        Animated.spring(this.state._animatedMenu, {
            toValue: 0
        }).start();
    }

    componentDidMount() {
        this._onRefresh()
    }

    onScroll(event) {
        var currentOffset = event.nativeEvent.contentOffset.y;

        if (currentOffset < alpha) {
            return;
        }

        if (Math.abs(offset - currentOffset) <= beta)
            return;

        if (this.state.isRefreshing) {
            return;
        }

        if (currentOffset > offset) {
            this.hideMenu();
            console.log('down');
        } else if (currentOffset < offset) {
            this.showMenu();
            console.log('up');
        }

        offset = currentOffset;
    }

    _onRefresh = () => {
        this.hideMenu();

        this.setState({
            isRefreshing: true
        });

        setTimeout(() => {
            this.showMenu();

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
            });
        }, 1000);
    }


    createDataSource({ productes }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(productes);
    }

    renderRow(productInfo) {
      return <ListItemLarge productInfo={productInfo} />;
    }

    render() {
        return (
            <View style={product.color}>
                <Animated.View style={[css.toolbarView, {transform: [{translateY: this.state._animatedMenu}]}]}>
                    <Toolbar name="لیست آگهی ها" heartButton={true} layoutButton={true}/>
                    <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={css.inputSearch} placeholder={'Search'}/>
                </Animated.View>

                <ListView style={{marginTop: 110}}
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    onScroll={this.onScroll.bind(this)} scrollEventThrottle={30}
                    refreshControl={<RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh}
                                    tintColor="#333"
                                    title="Loading..."
                                    titleColor="#333"
                                    colors={['#333', '#999', '#ddd']}
                                    progressBackgroundColor="#ffff00"
                                  />
                                }>


                </ListView>

            </View>
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

export default connect(mapStateToProps, {filterFetchWebSerivice})(ProductListLarge);
