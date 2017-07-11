import {
  PRODUCT_UPDATE,
  PRODUCT_CREATE,
  PRODUCT_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {

  Title: '',
  Fee: '',
  thumbnail_image: '',
  AutoAdsPicture: '',
  Id:'',
  KiloMeter:'',
  YearId:'',
  BrandCategoryId:'',
  ManualBrand:'',
  ModelCategoryId:'',
  ProvinceId:'',
  Status:'',
  TypeCategoryId:''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PRODUCT_CREATE:
      return INITIAL_STATE;
    case PRODUCT_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
