'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image } from "react-native";
import ResponsiveImage from 'react-native-responsive-image';
import { connect } from 'react-redux';
import {imagesLoaded, imagesStartedLoading } from '../../actions';

const product = require('./../Styles/shop.js').default;


export default class ProductScroll extends Component {
  // onLoadImage(){
  //   this.props.imagesLoaded(true);
  // }
  //
  // onLoadStartImage(){
  //   this.props.imagesStartedLoading();
  // }
    render() {
        return (
            <TouchableOpacity>
                <View style={product.panel}>
                    <Image source={ {uri:this.props.imageURL}} style={product.imagePanel} ></Image>
                </View>

                <Text style={product.name}>{this.props.name}</Text>
                <Text style={product.price}>{this.props.price}</Text>
            </TouchableOpacity>
        );
    }

}


//export default connect (null, {imagesLoaded,imagesStartedLoading})(ProductScroll);
