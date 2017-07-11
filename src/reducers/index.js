import { combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ProductFormReducer from './ProductFormReducer';
import ProductsReducer from './ProductsReducer';
import ProductReducer from './ProductReducer';
import ProductsReducerEst from './ProductsReducerEst';
import BaseItemsReducer from './BaseItemsReducer';
import ImageResizerReducer from './ImageResizerReducer';
import FilterReducer from './FilterReducer';
import StartAppReducer from './StartAppReducer';



export default combineReducers({
  auth: AuthReducer,
  productForm: ProductFormReducer,
  productes: ProductsReducer,
  productsest: ProductsReducerEst,
  product: ProductReducer,
  filterFields:FilterReducer,
  baseItems: BaseItemsReducer,
  resizedImageUri: ImageResizerReducer,
  imagesLoadStatus:StartAppReducer
});
