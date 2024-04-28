import { GET_BANNER_LIST, GET_BANNER_BY_ID } from "../action/bannerAction";

let initialState = {
  getBannerList: false,
  getBannerById:false,
  errorBannerList: false,
};

const banner = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNER_LIST:
      return {
        ...state,
        getBannerList: action.payload.data,
        errorBannerList: action.payload.errorMessage,
      };
    case GET_BANNER_BY_ID:
      return {
        ...state,
        getBannerById: action.payload.data,
        errorBannerList: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default banner;
