import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_BY_ID,
} from "../action/categoryAction";

let initialState = {
  getCategoryList: false,
  getCategoryById: false,
  errorCategoryList: false,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST:
      return {
        ...state,
        getCategoryList: action.payload.data,
        errorCategoryList: action.payload.errorMessage,
      };
    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        getCategoryById : action.payload.data,
        errorCategoryList: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default category;
