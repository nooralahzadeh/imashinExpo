import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import numeral from 'numeral';

import { connect } from 'react-redux';
import {productFetch } from '../actions';

class ListItem extends Component {
  onRowPress() {
    this.productFetch(this.props.product.Id);
    Actions.productDetail();
  }


  render() {


  const { AutoTitle, YearTitle, FirstPicturePath  } = this.props.product;
  //  const formatted_Fee= numeral(Fee).format('0,0' );
  var FirstPicture= `http://mashinchand.com/${FirstPicturePath}`|| '../images/no_thumb.jpg'

    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;


    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <View style={thumbnailContainerStyle}>
              <Image
                style={thumbnailStyle}
                source={{ uri: FirstPicture}}
              />
            </View>
            <View style={headerContentStyle}>
              <Text style={headerTextStyle}>{AutoTitle}</Text>
              <Text>{YearTitle}</Text>
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }

};

export default connect(null, {productFetch}) (ListItem);
