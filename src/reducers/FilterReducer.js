import {
FILTER_BRAND_SET,
FILTER_PLAQUE_TYPE_SET,
FILTER_FETCH,
FILTER_FETCH_FAIL,
FILTER_BRAND_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
  brand: '',
  plaque: '',
  loading:'',
  selectedbrands:[],
  error:''
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_BRAND_SET:
      return { ...state, brand: action.payload };

    case FILTER_BRAND_SELECTED:
        return { ...state, selectedbrands:action.payload.map((brand)=>{ return {value:brand.value, label:brand.label}})  };

    case FILTER_PLAQUE_TYPE_SET:
      return { ...state, plaque: action.payload };
      case FILTER_FETCH:
        return { ...state, loading: true, error: '' };
      case FILTER_FETCH_FAIL:
        return { ...state, error: 'Search Failed.', loading: false };
    default:
      return state;
  }
};
