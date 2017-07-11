import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image , TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import css from "./Styles/style";
import product from "./Styles/product";




class ListItemGrid extends Component {

  onRowPress() {
    Actions.productView({ productinfo: this.props.productInfo });
  }

  render() {

    const { AutoTitle, YearTitle, FirstPicturePath  } = this.props.productInfo;
    //  const formatted_Fee= numeral(Fee).format('0,0' );
    var FirstPictureURL= `http://mashinchand.com/${FirstPicturePath}`|| '../images/no_thumb.jpg'

    return (
      <View style={product.cardsGrid}>
        <Image source={{url: FirstPictureURL}} style={product.productItemGrid}></Image>
        <TouchableOpacity style={product.star}>
          <Image source={require('../images/icon-heart.png')} style={css.imageIcon}></Image>
        </TouchableOpacity>
        <Text style={product.productName}>{AutoTitle}</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={[product.discountPrice, {paddingBottom: 12, paddingLeft: 4}]}>{YearTitle}</Text>
        </View>
      </View>
    );
  }
}


export default ListItemGrid;
