import React, { Component } from 'react';
import {
   ActivityIndicator,
   View,
   StyleSheet
} from 'react-native';

export default WaitingFormHorizental = (props) => {
   return (
      <View style={{flexDirection:'row', "height": 220,
      "borderBottomColor": "#eee",
      "borderBottomWidth": 1}}>
         <ActivityIndicator animating = {props.animating}
           style = {styles.activityIndicator} size = "large"
         />
      </View>
   );
}

const styles = StyleSheet.create ({
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});
