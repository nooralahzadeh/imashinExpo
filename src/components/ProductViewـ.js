import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { productUpdate } from '../actions';
import { CardSection, Input, Card, Button } from './common';
import numeral from 'numeral';


class ProductView extends Component {

  render() {
    const {imageStyle, headerTextStyle, thumbnailContainerStyle, thumbnailStyle, headerContentStyle } = styles;
    const {Id, Title, Fee, AutoAdsPicture, thumbnail_image} = this.props.product;
    const formatted_Fee= numeral(Fee).format('0,0' );
    const image= AutoAdsPicture===null ? '': ( AutoAdsPicture.ImagePath===null ? '': `http://mashinchand.com/${AutoAdsPicture.ImagePath}`);
  
    return (
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image
              style={thumbnailStyle}
              source={{ uri: thumbnail_image }}
            />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{Title}</Text>
            <Text>{formatted_Fee}</Text>
          </View>
        </CardSection>

        <CardSection>
          <Image
            style={imageStyle}
              source={{ uri: image  , isStatic: true}}
          />
        </CardSection>

        <CardSection>
          <Button onPress={() => Linking.openURL(`http://mashinchand.com/Car/${Id}`)}>
            See more information...
          </Button>
        </CardSection>
      </Card>
    );
  }
}



const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    height: 400,
    flex: 1,
    width: null
  }
};



export default ProductView;
