import { GET_PROMO_LIST, GET_PROMO_BY_ID } from "../action/promoAction";

let initialState = {
  getPromoList: false,
  getPromoById: false,
  errorPromoList: false,
};

const promo = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROMO_LIST:
      return {
        ...state,
        getPromoList: action.payload.data,
        errorPromoList: action.payload.errorMessage,
      };
      case GET_PROMO_BY_ID:
      return {
        ...state,
        getPromoById: action.payload.data,
        errorPromoList: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default promo;
