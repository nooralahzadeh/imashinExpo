import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { stringify as queryString } from 'query-string';
import {
  FILTER_BRAND_SET,
  FILTER_PLAQUE_TYPE_SET,
  FILTER_FETCH,
  FILTER_FETCH_SUCCESS,
  FILTER_FETCH_CHEAPEST_SUCCESS,
  FILTER_FETCH_RECENT_SUCCESS,
  FILTER_FETCH_HKM_SUCCESS,
  FILTER_FETCH_LKM_SUCCESS,
  FILTER_FETCH_CHEAPEST,
  FILTER_FETCH_RECENT,
  FILTER_FETCH_HKM,
  FILTER_FETCH_LKM,
  FILTER_FETCH_FAIL,

  FILTER_BRAND_SELECTED

} from './types';
import {URL} from '../components/common/Constants';

//for select a brand in filter
export const brandsSelected= (brands) => {
  return {
    type: FILTER_BRAND_SELECTED,
    payload: brands
  };
};



export const brandSet= (text) => {
  return {
    type: FILTER_BRAND_SET,
    payload: text
  };
};


export const palqueSet = (text) => {
  return {
    type: FILTER_PLAQUE_TYPE_SET,
    payload: text
  };
};




export const filterFetchWebSerivice = ({ selectedbrands, selectedOrderOption }) => {
  var BrandCategoryId=[];
  var orderOption=false
  selectedbrands.map((brand)=>{
    BrandCategoryId.push(brand.value);
  });

  switch (selectedOrderOption.value) {
    case 'SearchByNewest':
          orderOption=true;
    case 'SearchByLowKilometer':
        orderOption=true;
    case 'SearchByCheepest':
         orderOption=true;
    default:

  }


  const query =queryString({
     BrandCategoryId: BrandCategoryId[0],
     PlaqueTypeId: 1,
     SearchByNewest:orderOption,
     SearchByLowKilometer:orderOption,
     SearchByCheepest:orderOption
   });
  const searchURL=`${URL.search}&${query}`
  console.log(searchURL);
  return (dispatch) => {
    axios.get(searchURL)
      .then(response =>{
        dispatch({ type: FILTER_FETCH_SUCCESS, payload: response.data });
        Actions.productListLarge();
      });
  };
};


export const productFetchRecent = () => {
        const fetchURL=`${URL.search}&SearchByNewest=True`

        return (dispatch) => {
          dispatch({type:FILTER_FETCH_RECENT});
          axios.get(fetchURL)
            .then(response =>{
              console.log(response);
              dispatch({ type: FILTER_FETCH_RECENT_SUCCESS, payload: response.data });

            });
        };
      };

export const productFetchCheapest = () => {

      const fetchURL=`${URL.search}&SearchByCheepest=True`
      return (dispatch) => {
      dispatch({type:FILTER_FETCH_CHEAPEST});
        axios.get(fetchURL)
          .then(response =>{
            dispatch({ type: FILTER_FETCH_CHEAPEST_SUCCESS, payload: response.data });
          });
      };
    };



  export const productFetchLowKilometer = () => {
              const fetchURL=`${URL.search}&SearchByLowKilometer=True`
              return (dispatch) => {
                  dispatch({type:FILTER_FETCH_LKM});
                axios.get(fetchURL)
                  .then(response =>{
                    dispatch({ type: FILTER_FETCH_LKM_SUCCESS, payload: response.data });
                  });
              };
            };

  export const productFetchHighKilometer = () => {
                        const fetchURL=`${URL.search}&SearchByHighKilometer=True`
                        return (dispatch) => {
                            dispatch({type:FILTER_FETCH_HKM});
                          axios.get(fetchURL)
                            .then(response =>{
                              dispatch({ type: FILTER_FETCH_HKM_SUCCESS, payload: response.data });
                            });
                        };
                      };

const fetchFail = (dispatch) => {
  dispatch({ type: FILTER_FETCH_FAIL });
};
