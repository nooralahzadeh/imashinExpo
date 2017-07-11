import {
  IMAGES_LOADED,
  IMAGES_STARTED_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  image_loaded:[],
  images_started:0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGES_LOADED:
      return {...state,image_loaded: state.image_loaded.concat(action.payload)};
    case IMAGES_STARTED_LOADING:
        return {...state,images_started: state.images_started+1};
    default:
      return state;
  }
};
