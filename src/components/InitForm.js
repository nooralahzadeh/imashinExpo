import React, { Component } from 'react';


import  {
  StyleSheet,
  View,
} from "react-native";

var Spinner = require('react-native-spinkit');
import TimerMixin from 'react-timer-mixin';
import { Actions } from 'react-native-router-flux';

export default class InitForm extends Component {

 state={
      type:  'Wave',
      size: 100,
      color: "#FFFFFF",
      isVisible: true,
    }
  componentDidMount () {
      TimerMixin.setTimeout(
        () => { Actions.home();},
        3000
      );
    }
  render() {
    var type = this.state.type;

    return (
        <View style={styles.container}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color}/>
        </View>


    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3CB371',
  },

  spinner: {
    marginBottom: 50
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
})
