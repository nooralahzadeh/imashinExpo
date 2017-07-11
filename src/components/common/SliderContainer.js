'use strict';

import React, { Component } from 'react';
import Slider from 'react-native-slider';
import {
  Text,
  View
} from 'react-native';


var DEFAULT_VALUE = 0;


export default class SliderContainer extends Component {

  state={
    value: DEFAULT_VALUE
  }

render() {
    return (
      <View style={styles.container}>
       <Slider
         trackStyle={styles.track}
         thumbStyle={styles.thumb}
         value={this.state.value}
         minimumTrackTintColor='#ec4c46'
         onValueChange={(value) => this.setState({value})} />
       <Text>Value: {this.state.value}</Text>
     </View>
    );
  },
};

const styles = {

  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  track: {
    height: 18,
    borderRadius: 1,
    backgroundColor: '#d5d8e8',
  },
  thumb: {
    width: 20,
    height: 30,
    borderRadius: 1,
    backgroundColor: '#838486',
  }
};
