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
} from '../actions/types';

const INITIAL_STATE = {
  brands:[],
  models:[],
  plaqueTypes:[],
  brands_models:[],
  bodyColors:[],
  interiorColors:[],
  bodyStates:[],
  autoClasses:[],
  yearList:[],
  plaque_loading: true,
  brands_loading: true,
  brands_model_loading:true,
  models_loading:true,
  bodyColors_loading:true,
  interiorColors_loading:true,
  bodyStates_loading:true,
  autoClasses_loading:true,
  yearList_loading:true,
  error:''
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case PLAQUETYPE_FETCH:
      return {...state, plaque_loading: true, plaqueTypes:[],error: ''};
    case PLAQUETYPE_FETCH_SUCCESS:
      return {...state, plaque_loading:false, plaqueTypes: state.plaqueTypes.concat(action.payload)};
    case BODYCOLOR_FETCH:
        return {...state, bodyColors_loading: true,bodyColors:[], error: ''};
    case BODYCOLOR_FETCH_SUCCESS:
        return {...state, bodyColors_loading:false, bodyColors: state.bodyColors.concat(action.payload)};
    case INTERIORCOLOR_FETCH:
        return {...state, interiorColors_loading: true,interiorColors:[], error: ''};
    case INTERIORCOLOR_FETCH_SUCCESS:
        return {...state, interiorColors_loading:false, interiorColors: state.interiorColors.concat(action.payload)};
    case BODYSTATE_FETCH:
            return {...state, bodyStates_loading: true,bodyStates:[], error: ''};
    case BODYSTATE_FETCH_SUCCESS:
            return {...state, bodyStates_loading:false, bodyStates: state.bodyStates.concat(action.payload)};
    case AUTOCLASS_FETCH:
            return {...state, autoClasses_loading: true,autoClasses:[], error: ''};
    case AUTOCLASS_FETCH_SUCCESS:
            return {...state, autoClasses_loading:false, autoClasses: state.autoClasses.concat(action.payload)};
    case YEARLIST_FETCH:
            return {...state, yearList_loading: true,yearList:[], error: ''};
    case YEARLIST_FETCH_SUCCESS:
            return {...state, yearList_loading:false, yearList: state.yearList.concat(action.payload)};
   case BRANDS_FETCH:
      return {...state,
      brands_loading: true,
      error: '',
      models:[]
      };
    case BRANDS_FETCH_SUCCESS:
      return {...state, brands_loading:false, brands: state.brands.concat(action.payload)};
    case MODELS_FETCH:
        return {...state, models_loading: true,
        error: '',
        models:[]
        };
    case MODELS_FETCH_SUCCESS:
        return {...state, models_loading:false, models: state.models.concat(action.payload)};
    case BRANDS_MODELS_FETCH:
      return {...state, brands_model_loading: true, error: '' };
    case BRANDS_MODELS_FETCH_SUCCESS:
        return {...state, brands_model_loading: false, brands_models: action.payload};
    default:
      return state;
  }
};
