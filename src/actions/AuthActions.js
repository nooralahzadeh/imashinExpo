import axios from 'axios';
import { Actions } from 'react-native-router-flux';
var sha1 = require('sha1');

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FROM_TO
} from './types';

import {URL} from '../components/common/Constants';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {

  // hasshing the password
  var PASHASH = sha1(password);
  const loginUrl=`${URL.root}/api/authenticateuser?MobileNo=${email}&Password=${PASHASH}`;
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    axios.get(loginUrl)
      .then(response =>{
        if(response.data.Message=='Confirmed'){
          loginUserSuccess(dispatch,response.data.Data)
        } else {
          loginUserFail(dispatch,response.data.Data)
        }

      }).catch((error) => {
        console.log(error);
      });
  };
};

const loginUserFail = (dispatch, message) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: message });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.productForm();
};

export const redirectFrom = (from_to) => {
  return {
    type: FROM_TO ,
    payload: from_to
  };
};
