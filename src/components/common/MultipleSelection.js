import React, { Component } from 'react'
import { View } from 'react-native'
import SelectMultiple from 'react-native-select-multiple';


export default class MultipleSelection extends Component {

    render() {
        return (
          <View>
            {/* <SelectMultiple
             items={[{ label: 'همه ', value: 'all'} ]}
             selectedItems={this.props.onSelectedItems}
             onSelectionsChange={this.props.onSelectionsChange} /> */}

            <SelectMultiple
             items={this.props.items}
             selectedItems={this.props.selectedItems}
             onSelectionsChange={this.props.onSelectionsChange} />
         </View>
        );
    }

}
