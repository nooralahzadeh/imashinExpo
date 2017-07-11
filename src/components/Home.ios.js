import React, {Component} from "react";

import {Text, View, Platform, Image, ScrollView, BackAndroid, TouchableOpacity, TextInput} from "react-native";
import ListItem from "./Layout/ListItem";
import HorizontalItem from "./Layout/HorizontalItem";
import Category from "./Category";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import AppEventEmitter from "../Services/AppEventEmitter";
import Icon from "react-native-vector-icons/EvilIcons";
import home from "./Styles/home";
import Toolbar from "./common/Toolbar";
import FooterTabs from './common/FooterTabs';
//import InitForm from './InitForm';






export default  class Home extends Component {


    open() {
        AppEventEmitter.emit('hamburger.click');
    }




    render() {

       return (

           <View style={home.color}>
               <Toolbar name='نمایشگاه خودرو' searchButton={true} />

               <View style={[home.search]}>
                   <TextInput
                       underlineColorAndroid='rgba(0,0,0,0)'
                       style={home.searchBar}
                       placeholder={'Looking for a gift..'}
                       selectionColor={'#7d59c8'}/>
                   <Icon name={'search'} style={home.searchIcon}/>
               </View>

               <View style={home.menu}>
                   <ScrollableTabView
                       initialPage={0}
                       locked={true}
                       tabBarUnderlineStyle={ {height: 2, backgroundColor: "#393800"}  }
                       tabBarActiveTextColor={"#393838"}
                       tabBarInactiveTextColor={"#B8B8B8"}
                       tabBarTextStyle={{height: 20, fontWeight: 'normal', fontSize: 13}}

                       renderTabBar={() => <ScrollableTabBar
                         underlineHeight={2}
                         tabsContainerStyle={{height: (Platform.OS === 'ios' ? 38 : 49)}}
                         tabStyle={{paddingBottom: 0, borderBottomWidth: 0, paddingTop: 0, paddingLeft: 10, paddingRight: 10}}
                        />}>
                       <HorizontalItem  tabLabel="آگهی های فروش"/>
                       {/* <ListItem tabLabel="Women"/> */}
                       <Category tabLabel="سایر"/>
                   </ScrollableTabView>
               </View>
               <FooterTabs home={true} list={false} add={false} search={false} profile={false}/>
               </View>


        );
    }
}

// const mapStateToProps = ({imagesLoadStatus}) => {
//   const {image_loaded, images_started } = imagesLoadStatus;
//   console.log(imagesLoadStatus);
//   return { image_loaded, images_started };
// };

//export default connect(mapStateToProps,{})(Home);
