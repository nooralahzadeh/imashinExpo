import {
  FILTER_FETCH_RECENT_SUCCESS,
  FILTER_FETCH_CHEAPEST_SUCCESS,
  FILTER_FETCH_HKM_SUCCESS,
  FILTER_FETCH_LKM_SUCCESS,
  FILTER_FETCH_RECENT,
  FILTER_FETCH_CHEAPEST,
  FILTER_FETCH_LKM,
  FILTER_FETCH_HKM
} from '../actions/types';

const INITIAL_STATE = {
  recent:'',
  cheapest:'',
  hkm:'',
  lkm:'',
  recent_loading: false,
  cheapest_loading: false,
  lkm_loading: false,
  hkm_loading: false


};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case FILTER_FETCH_RECENT:
      return {...state, recent_loading:true};
    case FILTER_FETCH_RECENT_SUCCESS:
      return {...state, recent_loading:false, recent: action.payload};
    case FILTER_FETCH_CHEAPEST:
        return {...state, cheapest_loading:true};
    case FILTER_FETCH_CHEAPEST_SUCCESS:
        return {...state, cheapest_loading:false,cheapest: action.payload};
    case FILTER_FETCH_LKM:
            return {...state, lkm_loading:true};
    case FILTER_FETCH_LKM_SUCCESS:
        return {...state, lkm_loading:false, lkm: action.payload};
    case FILTER_FETCH_HKM:
                return {...state, hkm_loading:true};
    case FILTER_FETCH_HKM_SUCCESS:
          return {...state,hkm_loading:false, hkm: action.payload};
    default:
      return state;
  }
};
