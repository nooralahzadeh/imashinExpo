'use strict';
import React, { Component } from 'react';
import { Text,View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import  Slider  from 'react-native-slider';
import { brandSet, palqueSet, filterFetchWebSerivice} from '../actions';
import ModalPicker from 'react-native-modal-picker';
import { Card, CardSection, Input, Button, Spinner } from './common';
import Toolbar from "./common/Toolbar";
//import {Cpicker}from 'react-native-picker-xg';
import { List, ListItem } from 'react-native-elements'
import WaitingFormHorizental from "./common/WaitingFormHorizental";
import { Actions } from 'react-native-router-flux';

import { Divider, Caption } from '@shoutem/ui';


import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';



class Filter extends Component {

state = {
  textInputBrand:'' ,
  brands: '' ,
  loading:false,
  selectedOrderOption:{},
  selectedOrderIndex:0,
  selectedbrands:[],
}



componentWillMount(){

  var selectedbrands=this.props.brands.filter((item)=>  {return item.checked});
  this.setState({selectedbrands:selectedbrands})

  if (selectedbrands.length>0){
    var textInputBrand=[];
    selectedbrands.map((item)=>{
      textInputBrand.push(item.label)}
    );
    textInputBrand=textInputBrand.join(" | ");

    this.setState({textInputBrand:textInputBrand});
  }
  else {
      this.setState({textInputBrand:'همه برندها'});
  }


}


onBrandSet(text) {
  this.props.brandSet(text);

}

onPlaqueSet(text) {
  this.props.palqueSet(text);
}

  onFilterPress() {
    const { selectedbrands, selectedOrderOption } = this.state;


    this.props.filterFetchWebSerivice({ selectedbrands,selectedOrderOption });
  }

  _renderBrandSelection(){
    Actions.brandsSelection();
  }


  _renderModelSelection({selectedBrands}){

    Actions.models();

  }



  // _renderCpicker() {
  //   if(!this.props.baseItems.brands_model_loading && this.props.baseItems.brands_models.length>0){
  //     var brands={}
  //     var brands_models=this.props.baseItems.brands_models;
  //
  //     let len = brands_models.length;
  //
  //     for(let i=0;i<len;i++){
  //         let models = [];
  //         for(let j=0;j<brands_models[i].Models.length;j++){
  //             let _model = brands_models[i]['Models'][j]['Text'] ;
  //             models.push(_model);
  //         }
  //
  //         brands[brands_models[i]['Text']]=models;
  //
  //     }
  //     return (
  //       <Cpicker
  //            pickerNameStyle = {{color:'red'}}
  //            cancelBtnStyle = {{color:'blue'}}
  //            //textStyle ={styles.labelStyle}
  //            confirmBtnText= 'انتخاب'
  //            cancelBtnText='انصراف'
  //            inputValue={this.state.textInputValue}
  //            level = {2}
  //            data = {brands}
  //            onResult = {(str)=>{
  //              this.setState({textInputValue:str});
  //            }}
  //          />
  //     );
  //   }
  //   }


renderSegmentOrdering(){
    const orderoptions = [
        {
          label:   'جدیدترین',
          value: 'SearchByNewest'
        },

        {
          label: 'کارکرد',
          value: 'SearchByLowKilometer'
        },

        {
          label: 'قیمت',
          value: 'SearchByCheepest'
        }
  ]

  function setSelectedOption(selectedOrderOption, selectedOrderIndex){
          this.setState({
            selectedOrderOption:selectedOrderOption,
            selectedOrderIndex:selectedOrderIndex
          });
        }
        return (
          <View style={{ padding: 20, backgroundColor: 'white'}}>
            <Text style={{paddingBottom: 10}}> مرتب سازی براساس</Text>
            <SegmentedControls
              options={ orderoptions }
              selectedIndex={this.state.selectedOrderIndex}
              onSelection={ setSelectedOption.bind(this) }
              selectedOption={this.state.selectedOrderOption}
              extractText={  (option) => option.label}
            />
          </View>);
        }

  render() {

      // if (this.props.baseItems.brands_model_loading) {
      //   console.log(this.props.baseItems.brands_model_loading);
      //   return <WaitingFormHorizental animating={this.props.baseItems.brands_model_loading} />;
      // }
      return (
        <Card>

          <Toolbar name='Filter' />
          {/* <TouchableOpacity onPress={this._createBrandsModelData(this.props)}> */}
                {/*{this._renderCpicker()}*/}
                 {/* </TouchableOpacity> */}

             <List>

             <ListItem
               title={this.state.textInputBrand}
               onPress	={this._renderBrandSelection.bind(this)}
             //leftIcon={{name: item.icon}}
             />
               </List>

           {this.renderSegmentOrdering()}

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            <Button
              onPress={this.onFilterPress.bind(this)}
              >
              جستجو
            </Button>
          </CardSection>
        </Card>
      );

  }
}



const styles = {
  inputStyle: {
    marginTop:10,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
};


var customStyles6 = StyleSheet.create({
  track: {
    height: 14,
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: '#9a9a9a',
    borderWidth: 1,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#eaeaea',
    borderColor: '#9a9a9a',
    borderWidth: 1,
  }
});

const mapStateToProps = ({ filterFields, baseItems}) => {
  const { brand, plaque, selectedbrands } = filterFields;
  var {brands} =baseItems
  return { brand, plaque ,brands, selectedbrands};
};


export default connect(mapStateToProps,{ brandSet, palqueSet, filterFetchWebSerivice}) (Filter);
