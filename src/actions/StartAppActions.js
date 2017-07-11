import {
  IMAGES_LOADED,
  IMAGES_STARTED_LOADING
} from './types';


export const imagesLoaded = (isImageLoaded) => {
  return {
    type: IMAGES_LOADED ,
    payload: isImageLoaded
  };
};


export const imagesStartedLoading = (isStarted) => {
  return {
    type: IMAGES_STARTED_LOADING
  };
};
