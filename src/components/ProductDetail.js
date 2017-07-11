'use strict';

import React, {Component} from "react";
import { connect } from 'react-redux';

import _ from 'lodash';
import {
    ListView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions
} from "react-native";

import {Actions} from "react-native-router-flux";
import css from "./Styles/style";
import Toolbar from "./common/Toolbar";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import product from "./Styles/product";
import Modal from "react-native-modalbox";
import AppEventEmitter from "../Services/AppEventEmitter";
import Swiper from "../../node_modules/react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import {URL} from '../components/common/Constants';

var deviceWidth = Dimensions.get('window').width;



class ProductDetail extends Component {

  constructor(props) {
      super(props);
      this.openProductDetail= this.openProductDetail.bind(this);
      this.closeProductDetail =this.closeProductDetail.bind(this);
    }

    // componentWillMount(){
    //       AppEventEmitter.addListener('open.product.click', this.openProductDetail.bind(this));
    //       AppEventEmitter.addListener('close.product.click', this.closeProductDetail.bind(this));
    //   }


      closeProductDetail ()  {
          this.refs.modalProduct.close();
      }


      openProductDetail () {
          this.refs.modalProduct.open();
      }

      // openProduct() {
      //     AppEventEmitter.emit('open.product.click');
      // }
      //
      // closeProduct() {
      //     AppEventEmitter.emit('close.product.click');
      // }

      getDescription(desc) {
          return desc.replace('<p>', '').substring(0, 200);
      }

      render() {
        //  var FirstPicturePath=`${URL.root}${this.props.product.AutoAdsDetail.FirstPicturePath}`;
          var description =  this.props.product.AutoAdsDetail.FullDescription|| '';
          var autoTitle= this.props.product.AutoAdsDetail.AutoTitle || '';
          var fee= this.props.product.AutoAdsDetail.Fee || '0';
          var imageList= this.props.product.AutoAdsPictures;
          console.log(imageList);

          const productDetails = (
              <View>
                  <ScrollView style={{marginTop:5,marginBottom:40}}>
                      <TouchableOpacity style={product.cards}>
                          <View
                              style={{flexDirection:'row',margin:8,width:deviceWidth-20,justifyContent:'space-between'}}>
                              <View style={{flexDirection:'row',alignItems:'center',marginLeft:5}}>
                                  <Icon name={'ios-shirt-outline'} style={product.productNavIcon}/>
                                  <Text style={{fontSize:12,marginLeft:5,marginRight:5}}>Select Size</Text>
                              </View>
                              <View style={{alignSelf:'center',marginRight:15,marginLeft:15}}>
                                  <Icon name={'ios-arrow-down'} style={product.detailsDropdown}/>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={product.cards}>
                          <View
                              style={{flexDirection:'row',margin:8,width:deviceWidth-20,justifyContent:'space-between'}}>
                              <View style={{flexDirection:'row',alignItems:'center',marginLeft:5}}>
                                  <Icon name={'ios-color-filter-outline'} style={product.productNavIcon}/>

                                  <Text style={{fontSize:12,marginLeft:5,marginRight:5}}>Select color</Text>
                              </View>
                              <View style={{alignSelf:'center',marginRight:15,marginLeft:15}}>
                                  <Icon name={'ios-arrow-down'} style={product.detailsDropdown}/>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={product.cards}>
                          <View
                              style={{flexDirection:'row',margin:8,width:deviceWidth-20,justifyContent:'space-between'}}>
                              <View style={{flexDirection:'row',alignItems:'center',marginLeft:5}}>
                                  <Icon name={'ios-time-outline'} style={product.productNavIcon}/>
                                  <Text style={{fontSize:12,marginLeft:5,marginRight:5}}>Check Delivery Options</Text>
                              </View>
                              <View style={{alignSelf:'center',marginRight:15,marginLeft:15}}>
                                  <Icon name={'ios-arrow-down'} style={product.detailsDropdown}/>
                              </View>
                          </View>
                      </TouchableOpacity>
                  </ScrollView>
              </View>
          )


          // var productImages =this.props.product.AutoAdsPictures.map((image, i) => {
          //
          //                 <View key={i}>
          //                     <Image source={{uri: `${URL.root}${image.ImagePath}`}} style={css.image}></Image>
          //                 </View>
          //
          //
          //       })




          var productSwipe = (

              <Swiper
                  dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
                  activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
                  paginationStyle={{top: 300, left: 10}}
                  >
                  <View>
                      <Image source={{uri: `${URL.root}${this.props.product.AutoAdsDetail.FirstPicturePath}`}}></Image>
                  </View>
                  {imageList.map((item, key) => {
                    return (

                      <View key={key}>
                                <Image source={{uri: `${URL.root}${item.ImagePath}`}}></Image>
                      </View>
                            )
                          })}

              </Swiper>

          )

          return (
              <View style={product.color}>
                  <ParallaxScrollView
                      backgroundColor="#eee"
                      contentBackgroundColor="white"
                      parallaxHeaderHeight={500}
                      renderFixedHeader={() => (
                          <Toolbar name="جزییات آگهی" action={Actions.productListLarge} isChild="true"/>
                      )}
                      renderBackground={() => (
                          <View style={{marginTop: 60}}>
                              <Image style={product.productItem} source={{uri: `${URL.root}${this.props.product.AutoAdsDetail.FirstPicturePath}`}}  />
                          </View>
                      )}
                      renderForeground={() => (
                             <View style={product.detailPanel}>
                                  <View style={product.detailBlock}>
                                      <TouchableOpacity style={product.iconZoom} onPress={this.openProductDetail}>
                                          <Image source={require('../images/icon-zoom-out.png')} style={css.imageIcon}></Image>
                                      </TouchableOpacity>

                                      <Text style={product.detailPrice}>${fee}</Text>
                                      <Text style={product.detailName}>{autoTitle}</Text>
                                      <Text style={product.detailDesc}>{this.getDescription(description) }
                                      </Text>
                                  </View>
                              </View>
                            )}>
                      <View>
                          {productDetails}
                      </View>
                  </ParallaxScrollView>

                  <View
                      style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>

                      <TouchableOpacity style={[product.detailsBtn,{backgroundColor:'#eee'}]}>
                          <Text style={[product.detailsBtnTxt,{color:'#494949'}]}>ADD TO CART</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[product.detailsBtn, css.backgroundColor]} onPress={Actions.cart}>
                          <Text style={[product.detailsBtnTxt,{color:'white'}]}>BUY NOW</Text>
                      </TouchableOpacity>
                  </View>

                  <Modal ref={"modalProduct"} swipeToClose={false} animationDuration={200}>
                      <View style={css.modal}>
                          {productSwipe}
                          <TouchableOpacity style={product.iconZoom} onPress={this.closeProductDetail}>
                              <Image source={require('../images/icon-zoom-in.png')}
                                     style={[css.imageIcon, {top: 2, right: 4}]}></Image>
                          </TouchableOpacity>
                      </View>
                  </Modal>
              </View>
          );
      }
}


const mapStateToProps = state => {
  const product =  state.product;
  return { product };
}

export default connect(mapStateToProps)(ProductDetail);
