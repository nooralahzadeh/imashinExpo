import {
IMAGE_RESIZE,
IMAGE_RESIZE_SUCCESS

} from '../actions/types';

const INITIAL_STATE = {
  resizedImageUri:'',
  loading :false,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_RESIZE:
        return { ...state, loading: true, error: '' };
    case IMAGE_RESIZE_SUCCESS:
        return { ...state, loading: false, resizedImageUri:action.payload};
    default:
      return state;
  }
};
