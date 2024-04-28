import { GET_ACTIVITY_LIST, GET_ACTIVITY_BY_ID } from "../action/activityAction";

let initialState = {
  getActivityList: false,
  getActivityById: false,
  errorActivityList: false,
};

const activity = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITY_LIST:
      return {
        ...state,
        getActivityList: action.payload.data,
        errorActivityList: action.payload.errorMessage,
      };
      case GET_ACTIVITY_BY_ID:
      return {
        ...state,
        getActivityById: action.payload.data,
        errorActivityList: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default activity;
