'use strict';

import React, {Component} from "react";
import {Navigator, Text, View} from "react-native";
import {Scene, Router, Schema, Actions, Animations, TabBar} from "react-native-router-flux";
//import Intro from "./Views/Intro";
import Login from "./components/LoginForm";
//import InitForm from "./components/InitForm";
import Home from "./components/Home";
import ProductListLarge from "./components/ProductListLarge";
//import Product from "./Views/Product";
import Profile from "./components/Profile";
//import Notification from "./Views/Notification";
//import Complete from "./Views/Complete";
//import Checkout from "./Views/Checkout";
//import TrackOrder from "./Views/TrackOrder";
//import Cart from "./Views/Cart";
//import WooProduct from "./Views/WooCommerce/Index";
import WishList from "./components/WishList";
import Filter from "./components/Filter";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";

//import MyOrder from "./Views/MyOrder";
//import PostDetails from "./Views/Wordpress/NewsDetail";
//import News from "./Views/Wordpress/Index";
//import Templates from "./Views/Templates";
import AppEventEmitter from "./Services/AppEventEmitter";
//import MenuSide from "./components/Navigation/MenuOverlay";
 //import MenuSide from "./components/Navigation/MenuSmall";
 //import MenuSide from "./components/Navigation/MenuWide";
import MenuSide from "./components/Navigation/MenuScale";
import BrandsSelection from "./components/BrandsSelection";
import BrandsSelectionView from "./components/BrandsSelectionView";

//import ItemImagePicker from "./components/common/ItemImagePicker";

//import MapSearch from "./components/MapSearch";




export default class RootRouter extends Component {
    state = {menuStyle: 0}

    changeMenuStyle(data) {
        this.setState({menuStyle: data.menuId})
    }



    componentDidMount() {

        AppEventEmitter.addListener('app.changeMenuStyle', this.changeMenuStyle.bind(this));
    }
//
    render() {
        const check=true;

              const scenes = Actions.create(
                  <Scene key="scene">
                      {/* <Scene key="init" component={InitForm} title="InitForm"/> */}
                      <Scene key="home" component={Home} title="Home"/>
                      <Scene key="productListLarge" component={ProductListLarge} title="لیست آگهی ها" />
                      <Scene key="productDetail" component={ProductDetail} title="جزییات آگهی" />
                      <Scene key="productgrid" component={ProductGrid} title="لیست آگهی ها" />
                      <Scene key="profile" component={Profile} title="Profile"/>
                      <Scene key="wishList" component={Profile} title="WishList"/>
                      <Scene key="filter" component={Filter} title="Filter"/>
                      <Scene key="brands" component={BrandsSelection} title="Brands"/>
                      <Scene key="brandsSelection" component={BrandsSelectionView} title="BrandsSelection"/>
                      <Scene key="productForm" component={ProductForm} title="ProductForm"/>
                      <Scene key="login" component={Login} title="Login"/>
                  </Scene>
              );

        return (
          <MenuSide ref="menuDefault" scenes={scenes}/>
        );
    }
}
