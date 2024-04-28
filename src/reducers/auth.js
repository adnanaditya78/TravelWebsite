import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGGED,
  UPDATE_PROFILE,
  GET_ALL_USER,
} from "../action/authAction";

let initialState = {
  token: false,
  users: false,
  user: false,
  userLogged: false,
  errorLogin: false,
};

const banner = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        token: action.payload.data,
        errorLogin: action.payload.errorMessage,
      };
    case AUTH_REGISTER:
      return {
        ...state,
        user: action.payload.data,
        errorLogin: action.payload.errorMessage,
      };
    case AUTH_LOGGED:
      return {
        ...state,
        userLogged: action.payload.data,
        errorLogin: action.payload.errorMessage,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload.data,
        errorLogin: action.payload.errorMessage,
      };
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload.data,
        errorLogin: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default banner;
