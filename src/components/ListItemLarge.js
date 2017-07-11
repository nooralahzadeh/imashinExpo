import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, TouchableWithoutFeedback, View, Image , TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import css from "./Styles/style";
import product from "./Styles/product";
import {URL} from '../components/common/Constants';
import {productFetch } from '../actions';

import Icon from 'react-native-vector-icons/FontAwesome';


class ListItemLarge extends Component {

  onRowPress() {

    this.props.productFetch(this.props.productInfo.Id);
    //Actions.productdetail({productId:this.props.productInfo.Id });
  }


  render() {

    const { AutoTitle, YearTitle, FirstPicturePath, NumOfView  } = this.props.productInfo;

    console.log(this.props.productInfo);
    //  const formatted_Fee= numeral(Fee).format('0,0' );
    var FirstPicture= `${URL.root}/${FirstPicturePath}`|| '../images/no_thumb.jpg'


    return (
      <TouchableOpacity style={[product.cards, {marginTop: 5} ]} onPress={this.onRowPress.bind(this)}>
          <Image source={{ uri: FirstPicture}} style={product.productItem}></Image>
          <TouchableOpacity style={product.star}>
              <Image source={require('../images/icon-heart.png')} style={css.imageIcon}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={product.camera}>
              <Icon name="camera" size={10} color="#535353">
                <Text>{NumOfView}</Text>
                </Icon>
          </TouchableOpacity>
          <Text style={product.productName}>{AutoTitle}</Text>
          <View style={{flexDirection:'row'}}>
              <Text style={[product.discountPrice, {paddingBottom: 12}]}>{YearTitle}</Text>
          </View>
          <TouchableOpacity style={product.view}>
              <Icon name="eye" size={10} color="#535353">
                <Text>{NumOfView}</Text>
                </Icon>
          </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}


export default connect (null, {productFetch})(ListItemLarge);
