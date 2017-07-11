import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from "./common/Toolbar";

import {
    StyleSheet,
    ScrollView,
    View,
} from 'react-native'
import CheckBox from 'react-native-check-box'
import { brandsSelected } from '../actions';
import { Actions } from 'react-native-router-flux';




class BrandsSelectionView extends Component {

  state = { dataArray: [] }

  componentWillMount(){

    this.setState({dataArray:this.props.brandList});
  }


_onBack(){
  //this.props.brandsSelected(this.state.selected);
  Actions.filter();
}



onClick(data) {
       data.checked = !data.checked;
       let msg=data.checked? 'you checked ':'you unchecked '
   }


renderView() {
           if (!this.state.dataArray || this.state.dataArray.length === 0)return;
           var len = this.state.dataArray.length;
           var views = [];
           for (var i = 0, l = len - 2; i < l; i += 2) {
               views.push(
                   <View key={i}>
                       <View style={styles.item}>
                           {this.renderCheckBox(this.state.dataArray[i])}
                           {this.renderCheckBox(this.state.dataArray[i + 1])}
                       </View>
                       <View style={styles.line}/>
                   </View>
               )
           }
           views.push(
               <View key={len - 1}>
                   <View style={styles.item}>
                       {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                       {this.renderCheckBox(this.state.dataArray[len - 1])}
                   </View>
               </View>
           )
           return views;

       }

  renderCheckBox(data) {
         var leftText = data.label;
         return (
             <CheckBox
                 style={{flex: 1, padding: 10}}
                 onClick={()=>this.onClick(data)}
                 isChecked={data.checked}
                 leftText={leftText}
             />);
     }

    render() {


        return (
          <View style={styles.container}>
            <Toolbar name="انتخاب" action={this._onBack.bind(this)} isChild="true"/>
                <ScrollView>
                     {this.renderView()}
                 </ScrollView>

          </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})


const mapStateToProps = ({  baseItems, filterFields }) => {

  var {selectedbrands}=filterFields;
  var brandList=baseItems.brands;
  return {brandList, selectedbrands};
};

export default connect(mapStateToProps)(BrandsSelectionView)
