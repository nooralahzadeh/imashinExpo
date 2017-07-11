import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  PRODUCT_UPDATE,
  PRODUCT_CREATE,
  PRODUCTES_FETCH_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_SAVE_SUCCESS
} from './types';
import {URL} from '../components/common/Constants';



export const productFetch = (prodcutId) => {
    const fetchURL=`${URL.fetch}${prodcutId}`
    return (dispatch) => {
      axios.get(fetchURL)
        .then(response =>{
          dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: response.data });
          Actions.productDetail({ type: 'reset' });

        });
    };
  };



export const productUpdate = ({ prop, value }) => {
  return {
    type: PRODUCT_UPDATE,
    payload: { prop, value }
  };
};


export const productCreate = ({ title, price, thumbnail_image, image, url }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/productes`)
      .push({ title, price, thumbnail_image, image, url })
      .then(() => {
        dispatch({ type: PRODUCT_CREATE });
        Actions.productList({ type: 'reset' });
      });
  };
};


export const productesFetchWebSerivice = () => {
  return (dispatch) => {
    axios.get('http://www.mashinchand.com/api/list/1')
      .then(response =>{
        dispatch({ type: PRODUCTES_FETCH_SUCCESS, payload: response.data });
      });
  };
};


export const productSave = ({ title, price, thumbnail_image, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/productes/${uid}`)
      .set({ title, price, thumbnail_image })
      .then(() => {
        dispatch({ type: PRODUCT_SAVE_SUCCESS });
        Actions.productList({ type: 'reset' });
      });
  };
};



export const productDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/productes/${uid}`)
      .remove()
      .then(() => {
        Actions.productList({ type: 'reset' });
      });
  };
};
