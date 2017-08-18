import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PHONE_CHANGED,
  NAMES_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FROM_TO
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  names:'',
  phone:'',
  user: null,
  error: '',
  loading: false,
  from_to:''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PHONE_CHANGED:
        return { ...state, phone: action.payload };
    case NAMES_CHANGED:
          return { ...state, names: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    case FROM_TO:
      return { ...state, ...INITIAL_STATE, from_to : action.payload };
    default:
      return state;
  }
};
