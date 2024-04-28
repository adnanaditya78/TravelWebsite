import { UPLOAD_IMAGE } from "../action/imageAction";

let initialState = {
  link: false,
  errorBannerList: false,
};

const image = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        link: action.payload.data.url,
        errorBannerList: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default image;
