'use strict';

import React, {Component} from "react";
import {Text, View, Dimensions, StyleSheet, PixelRatio, Image, ListView, TouchableOpacity} from "react-native";
import styles from "./Styles/category";
import Parallax from "react-native-parallax";

var SCROLLVIEW = 'Parallax_scroll';
var PARALLAX_FACTOR = 0.8;
var SECTIONS = [
    {
        title: 'خودرو',
        number: '2990',
        keyword: require("../images/car_main_picture.png"),
    },
    {
        title: 'کامیون، کامیونت',
        number: '23900',
        keyword: require('../images/camiun-01.png'),
    },
    {
        title: 'موتورسیکلت',
        number: '99',
        keyword: require('../images/motor.png'),
    },
    {
        title: 'ماشین آلات ساختمانی',
        number: '3320',
        keyword: require('../images/bulldozer.jpg'),
    },
    {
        title: 'نمایشگاه ها و نمایندگی ها',
        number: '360',
        keyword: require('../images/namayeshgah.png'),
    },
    {
        title: 'اجاره خودرو',
        number: '340',
        keyword: require('../images/ejare.png'),
    },
    {
        title: 'مقایسه فنی خودروها',
        number: '430',
        keyword: require('../images/video_drag.png'),
    }
];

export default class Category extends Component {
    render() {
        return (
            <Parallax.ScrollView ref={SCROLLVIEW} style={styles.scrollView}>
                {SECTIONS.map((section, i) => (
                    <Parallax.Image
                        key={i}
                        style={styles.image}
                        overlayStyle={styles.overlay}
                        source={section.keyword}
                        parallaxFactor={PARALLAX_FACTOR}>
                        <Text style={styles.title}>{section.title}</Text>
                        <Text style={styles.description}>{section.number} مورد</Text>
                    </Parallax.Image>
                ))}
            </Parallax.ScrollView>
        );
    }
}
