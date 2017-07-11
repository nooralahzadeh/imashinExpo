'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import css from "./style";
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";


export default class SideMenu extends Component {
    render() {
        return (
            <ScrollView>
                <View style={[css.sideMenu, this.props.menuBody]}>
                  <Image source={require('../../images/menubackground.png')}
                         style={css.menuBg}>
                  </Image>

                  <View style={css.profileCenter}>
                      <Image style={css.avatarLeft}
                             source={{uri: 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png' }}/>
                           <Text style={[css.fullname, this.props.textColor]}>فرزاد نوراله زاده</Text>
                      <Text style={[css.email, this.props.textColor]}>farzad@mashinchand.com</Text>
                      <Text style={[css.address, this.props.textColor]}>Tehran <Icon name={'ios-pin-outline'}
                                                                                     style={[css.iconSmall]}/></Text>
                  </View>

                    <TouchableOpacity
                        style={[css.menuRow, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.home}
                        >
                        <Text style={[css.menuLink, this.props.textColor]}>آگهی های من</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[css.menuRow, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        //onPress={Actions.wishList}
                        >
                        <Text style={[css.menuLink, this.props.textColor]}>آگهی های دلخواه</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[css.menuRow, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.profile}
                        >
                        <Text style={[css.menuLink, this.props.textColor]}>پروفایل</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[css.menuRow, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.productForm}
                        >
                        <Text style={[css.menuLink, this.props.textColor]}>می فروشمش</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[css.menuRow, css.menuSignOut, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        //onPress={Actions.login}
                        >
                        <Text style={[css.menuLink, css.logoutLink, this.props.textColor]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}
