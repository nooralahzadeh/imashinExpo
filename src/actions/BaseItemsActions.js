import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { stringify as queryString } from 'query-string';
import {
  BRANDS_FETCH_SUCCESS,
  BRANDS_FETCH,
  BRANDS_MODELS_FETCH,
  BRANDS_MODELS_FETCH_SUCCESS,
  MODELS_FETCH,
  MODELS_FETCH_SUCCESS,
  PLAQUETYPE_FETCH,
  PLAQUETYPE_FETCH_SUCCESS,
  BODYCOLOR_FETCH,
  BODYCOLOR_FETCH_SUCCESS,
  INTERIORCOLOR_FETCH,
  INTERIORCOLOR_FETCH_SUCCESS,
  BODYSTATE_FETCH,
  BODYSTATE_FETCH_SUCCESS,
  AUTOCLASS_FETCH,
  AUTOCLASS_FETCH_SUCCESS,
  YEARLIST_FETCH,
  YEARLIST_FETCH_SUCCESS
} from './types';

import {URL} from '../components/common/Constants';


export const getBodyColorList = () => {
  const searchURL=`${URL.root}/CarApi/GetBodyColorList`;
  return (dispatch) => {
    dispatch({ type: BODYCOLOR_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var bodyColors= [];
        response.data.map((member,key)=>{
            var _bodyColor = {};
            _bodyColor['label']=member.Text;
            _bodyColor['value']=member.Value;
            _bodyColor['disabled']=member.Disabled;
            _bodyColor['group']=member.Group;
            _bodyColor['selected']=member.Selected;
            bodyColors.push(_bodyColor);
        })
        dispatch({ type: BODYCOLOR_FETCH_SUCCESS, payload: bodyColors });
      }).catch((error) => {
        console.log(error);
      });
  };
};


export const getInteriorColorList = () => {
  const searchURL=`${URL.root}/CarApi/GetInteriorColorList`;
  return (dispatch) => {
    dispatch({ type: INTERIORCOLOR_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var interiorColors= [];
        response.data.map((member,key)=>{
            var _interiorColor = {};
            _interiorColor['label']=member.Text;
            _interiorColor['value']=member.Value;
            _interiorColor['disabled']=member.Disabled;
            _interiorColor['group']=member.Group;
            _interiorColor['selected']=member.Selected;
            interiorColors.push(_interiorColor);
        })
        dispatch({ type: INTERIORCOLOR_FETCH_SUCCESS, payload: interiorColors });
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const getBodyStateList = () => {
  const searchURL=`${URL.root}/CarApi/GetBodyStateList`;
  return (dispatch) => {
    dispatch({ type: BODYSTATE_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var bodyStates= [];
        response.data.map((member,key)=>{
            var _bodyState = {};
            _bodyState['label']=member.Text;
            _bodyState['value']=member.Value;
            _bodyState['disabled']=member.Disabled;
            _bodyState['group']=member.Group;
            _bodyState['selected']=member.Selected;
            bodyStates.push(_bodyState);
        })
        dispatch({ type: BODYSTATE_FETCH_SUCCESS, payload: bodyStates });
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const getAutoClassList = () => {
  const searchURL=`${URL.root}/CarApi/GetAutoClassList`;
  return (dispatch) => {
    dispatch({ type: AUTOCLASS_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var autoClasses= [];
        response.data.map((member,key)=>{
            var _autoClass = {};

            _autoClass['label']=member.Text;
            _autoClass['value']=member.Value;
            _autoClass['disabled']=member.Disabled;
            _autoClass['group']=member.Group;
            _autoClass['selected']=member.Selected;
            autoClasses.push(_autoClass);
        })
        dispatch({ type: AUTOCLASS_FETCH_SUCCESS, payload: autoClasses });
      }).catch((error) => {
        console.log(error);
      });
  };
};


export const getPlaqueTypeList = () => {
  const searchURL=`${URL.root}/CarApi/GetPlaqueTypeList`;
  return (dispatch) => {
    dispatch({ type: PLAQUETYPE_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var plaqueTypes= [];
        response.data.map((member,key)=>{
            var _plaqueType = {};
            _plaqueType['label']=member.Text;
            _plaqueType['value']=member.Value;
            _plaqueType['disabled']=member.Disabled;
            _plaqueType['group']=member.Group;
            _plaqueType['selected']=member.Selected;
            plaqueTypes.push(_plaqueType);
        })
        dispatch({ type: PLAQUETYPE_FETCH_SUCCESS, payload: plaqueTypes });
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const getBrandList = () => {
  const searchURL=`${URL.root}/CarApi/GetBrandList?type=1`;

  return (dispatch) => {
    dispatch({ type: BRANDS_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var brands = [];

        response.data.map((member,key)=>{
            var _brand = {};
            _brand['label']=member.Text;
            _brand['value']=member.Value;
            _brand['checked']=false;
            brands.push(_brand);
        })
        dispatch({ type: BRANDS_FETCH_SUCCESS, payload: brands });
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const getModelsList=(brand)=>{
  const searchURL=`${URL.root}/CarApi/GetModelList?brandId=${brand}`
  return (dispatch) => {
    dispatch({ type: MODELS_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var models = [];
        response.data.map((member,key)=>{
            var _model = {};
            _model['label']=member.Text;
            _model['value']=member.Value;
            _model['disabled']=member.Disabled;
            _model['group']=member.Group;
            _model['selected']=member.Selected;
            models.push(_model);
        })
        //console.log(models);
        dispatch({ type: MODELS_FETCH_SUCCESS, payload: models });
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const getYearList=(IsForeign)=>{
  const searchURL=`${URL.root}/CarApi/GetYearList?IsForeign=${IsForeign}`
  
  return (dispatch) => {
    dispatch({ type: YEARLIST_FETCH });
    axios.get(searchURL)
      .then(response =>{

        var years = [];
        response.data.map((member,key)=>{
            var _year = {};
            _year['label']=member.Text;
            _year['value']=member.Value;
            _year['disabled']=member.Disabled;
            _year['group']=member.Group;
            _year['selected']=member.Selected;
            years.push(_year);
        })
        //console.log(models);
        dispatch({ type: YEARLIST_FETCH_SUCCESS, payload: years });
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const getBrandsModels = () => {

  return (dispatch,getState) => {
    var brand_model=[];
    dispatch({ type: BRANDS_MODELS_FETCH });
    const { baseItems } = getState();
    const brands= baseItems.brands;
    let len = brands.length;
    brands.map((brand, key)=>{
      var searchURL=`${URL.root}/CarApi/GetModelList?brandId=${brand.Value}`;
        axios.get(searchURL)
          .then(response =>{

            var model = [];
            let brandLen=response.data.length;

            response.data.map((member,key)=>{
                var _model = {};
                _model['Text']=member.Text;
                _model['Value']=member.Value;
                model.push(_model);
            })
            var _data = {};
            _data['Models'] = model;
            _data['Text'] = brand.Text;
            _data['Value'] = brand.Value;
            brand_model.push(_data);
          });
        })
    dispatch({ type: BRANDS_MODELS_FETCH_SUCCESS, payload: brand_model });

  };
};
