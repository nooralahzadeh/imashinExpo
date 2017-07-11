import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,View } from 'react-native';
import Toolbar from "./common/Toolbar";
import MultipleSelection from "./common/MultipleSelection";

import { brandsSelected } from '../actions';
import { Actions } from 'react-native-router-flux';


class BrandsSelection extends Component {

  state = { selected: [] }

  componentWillMount(){

    this.setState({selected:this.props.selectedbrands});
  }

  onSelectionsChange = (selected) => {
    this.setState({ selected })
  }

_onBack(){
  this.props.brandsSelected(this.state.selected);
  Actions.filter();

}

    render() {


        return (
          <View>
              <Toolbar name="انتخاب" action={this._onBack.bind(this)} isChild="true"/>
              <MultipleSelection items={this.props.brandList}
                selectedItems={this.state.selected}
                onSelectionsChange={this.onSelectionsChange}
              />

          </View>
         );
    }
}

const mapStateToProps = ({  baseItems, filterFields }) => {

  var {selectedbrands}=filterFields
  var brandList=baseItems.brands;
  return {brandList, selectedbrands};
};

export default connect(mapStateToProps,{brandsSelected})(BrandsSelection)
