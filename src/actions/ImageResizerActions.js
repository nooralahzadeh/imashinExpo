import {
  IMAGE_RESIZE,
  IMAGE_RESIZE_SUCCESS
} from './types';

import ImageResizer from 'react-native-image-resizer';

export const resizeImage = (imageUrl, newWidth, newHeight, compressFormat, quality) => {
  return (dispatch) => {
    dispatch({type: IMAGE_RESIZE});
    ImageResizer.createResizedImage(imageUrl, newWidth, newHeight, compressFormat, quality).then((resizedImageUri) => {
      // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
      dispatch({ type: IMAGE_RESIZE_SUCCESS, payload: resizedImageUri });
      }).catch((err) => {
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
        console.log(err);
      });
    }
}
