import axios from 'axios';

export const GET_PROMO_LIST = 'GET_PROMO_LIST';
export const GET_PROMO_BY_ID = 'GET_PROMO_BY_ID';
export const DELETE_PROMO = 'DELETE_PROMO';
export const UPDATE_PROMO = 'UPDATE_PROMO';
export const ADD_PROMO = 'ADD_PROMO';

export const getPromoList = () => {
  return (dispatch) => {
    axios
      .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      })
      .then(function (response) {
        // handle success
        dispatch({
          type: GET_PROMO_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: GET_PROMO_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
};

export const getPromoById = (promoId) => {
  return (dispatch) => {
    axios
      .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/' + promoId, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      })
      .then(function (response) {
        // handle success
        dispatch({
          type: GET_PROMO_BY_ID,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: GET_PROMO_BY_ID,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
};
const token = sessionStorage.getItem('token');

export const deletePromo = (bannerId) => {
  return (dispatch) => {
    axios
      .delete('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/' + bannerId, {
        headers: {
          Authorization: 'Bearer ' + token,
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      })
      .then(function (response) {
        // handle success
        dispatch({
          type: DELETE_PROMO,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: DELETE_PROMO,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
};

export const addPromo = ({ title, description, getUrl, terms_condition, promo_code, promo_discount_price, minimum_claim_price }) => {
  console.log({ getUrl });
  return (dispatch) => {
    axios
      .post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo',
        {
          title: title,
          description: description,
          imageUrl: getUrl,
          terms_condition: terms_condition,
          promo_code: promo_code,
          promo_discount_price: promo_discount_price,
          minimum_claim_price: minimum_claim_price,
        },
        {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: ADD_PROMO,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(response);
        // Lakukan sesuatu dengan data yang diterima, seperti dispatch action
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: ADD_PROMO,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
        console.log(error);
        // Lakukan sesuatu dengan error yang diterima, seperti dispatch action untuk menangani error
      });
  };
};

export const updatePromo = (promoId, title, description, imageUrl, terms_condition, promo_code, promo_discount_price, minimum_claim_price) => {
  console.log(promoId, title, description, imageUrl, terms_condition, promo_code, promo_discount_price, minimum_claim_price);

  return (dispatch) => {
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${promoId}`,
        {
          title,
          description,
          imageUrl,
          terms_condition,
          promo_code,
          promo_discount_price: parseFloat(promo_discount_price), // Konversi ke numerik
          minimum_claim_price: parseFloat(minimum_claim_price), // Konversi ke numerik
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      )
      .then(function (response) {
        // Handle success
        dispatch({
          type: UPDATE_PROMO,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(response);
      })
      .catch(function (error) {
        // Handle error
        dispatch({
          type: UPDATE_PROMO,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
        console.log(error);
      })
      .finally(function () {
        // Always executed
      });
  };
};
