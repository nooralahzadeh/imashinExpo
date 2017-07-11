import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RootRouter from './RootRouter';
import Expo,{
  Asset,
  Font,
} from 'expo';

import store from './store';


class App extends Component {
  state = {
    isReady: false,
  };


async _cacheResourcesAsync() {
    const images = [
      //require('./assets/images/expo-icon.png'),
      //require('./assets/images/slack-icon.png'),
    ];

    for (let image of images) {
      await Asset.fromModule(image).downloadAsync();
    }

    await Font.loadAsync({
       'Roboto': require('native-base/Fonts/Roboto.ttf'),
       'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
     });

    this.setState({isReady: true});
  }

 componentWillMount() {
    const config = {
    apiKey: "AIzaSyAocW8dgwL3uFPlNpIGFzswJCg78JoZHF0",
     authDomain: "mashinchand-9b50d.firebaseapp.com",
     databaseURL: "https://mashinchand-9b50d.firebaseio.com",
     storageBucket: "mashinchand-9b50d.appspot.com",
     messagingSenderId: "984323938047"
    };

    firebase.initializeApp(config);

    this._cacheResourcesAsync();


  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
      }
    return (
    <Provider store={store}>
        <RootRouter />
      </Provider>
    );
  }
}

export default App;
