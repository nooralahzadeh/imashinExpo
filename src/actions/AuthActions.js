import axios from 'axios';
import { Actions } from 'react-native-router-flux';
var sha1 = require('sha1');

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PHONE_CHANGED,
  NAMES_CHANGED,
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

export const namesChanged = (text) => {
  return {
    type: NAMES_CHANGED,
    payload: text
  };
};

export const phoneChanged = (text) => {
  return {
    type: PHONE_CHANGED,
    payload: text
  };
};


export const loginUser = ({ email, password }) => {

  // hasshing the password
  var PASHASH = sha1(password);
  const loginUrl=`${URL.root}/api/authenticateuser?MobileNo=${email}&Password=${PASHASH}`;
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: LOGIN_USER });
    axios.get(loginUrl)
      .then(response =>{
        if(response.data.Message=='Confirmed'){
          loginUserSuccess(dispatch,response.data.Data, state.auth.from_to)
        } else {
          loginUserFail(dispatch,response.data.Data )
        }

      }).catch((error) => {
        console.log(error);
      });
  };
};

export const registerUser = ({phone, email, password, names}) => {

  // hasshing the password
  const loginUrl=`${URL.root}/api/register?MobileNo=${phone}&Password=${password}&FullName=${names}&Email=${email}` ;
  return (dispatch, getState) => {
    const state = getState();

    if(state.auth.phone ==''){
        loginUserFail(dispatch,'لطفاٌ شماره موبایل خود را وارد نمایید.')
    }
    if(state.auth.password ==''){
        loginUserFail(dispatch,'لطفاٌ پسوردی برای پروفایل وارد نمایید.')
    }
    dispatch({ type: LOGIN_USER});

    axios.get(loginUrl)
      .then(response =>{
        console.log(loginUrl);
        if(response.data == 'شماره موبایل قبلا استفاده شده است'){
          loginUserFail(dispatch,response.data)
        } else {
          loginUserSuccess(dispatch ,response.data, state.auth.from_to)
        }

      }).catch((error) => {
        console.log(error);
      });
  };
};

const loginUserFail = (dispatch, message) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: message });
};

const loginUserSuccess = (dispatch, user, from) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  if(from=='add'){
    Actions.productForm();
  } else if(from=='login'){
    Actions.productForm();
  }

};

export const redirectFrom = (from_to) => {
  return {
    type: FROM_TO ,
    payload: from_to
  };
};
