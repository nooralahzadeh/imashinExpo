
'use strict';
import React, { Component } from 'react';

import {
   View,
   Image,
   TouchableHighlight
    } from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';


import product from "./../Styles/shop";

export default class Thumb extends Component {
  render() {
    return (

              <View style={product.panel}>
                <Image style={product.imagePanel} source={this.props.uri}/>
                <TouchableHighlight onPress = {() => {this.props.onDelete()}}>
                      <Icon name="close-o" size = {30} color="white"/>
                </TouchableHighlight>
              </View>

    );
  }
}
