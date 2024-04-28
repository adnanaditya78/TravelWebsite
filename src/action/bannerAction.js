import axios from "axios";

export const GET_BANNER_LIST = "GET_BANNER_LIST";
export const GET_BANNER_BY_ID = "GET_BANNER_BY_ID";
export const ADD_BANNER = "ADD_BANNER";
export const DELETE_BANNER = "DELETE_BANNER";
export const UPDATE_BANNER = "UPDATE_BANNER";

export const getBannersList = () => {
  return (dispatch) => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: GET_BANNER_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: GET_BANNER_LIST,
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

export const getBannerById = (id) => {
  return (dispatch) => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/" +
          id,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: GET_BANNER_BY_ID,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: GET_BANNER_BY_ID,
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
const token = sessionStorage.getItem("token");

export const addBanner = (name, imageUrl) => {
  return (dispatch) => {
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        {
          name: name,
          imageUrl: imageUrl,
        },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: ADD_BANNER,
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
          type: ADD_BANNER,
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

export const deleteBanner = (bannerId) => {
  return (dispatch) => {
    axios
      .delete(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/" +
          bannerId,
        {
          headers: {
            Authorization: "Bearer " + token,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: DELETE_BANNER,
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
          type: DELETE_BANNER,
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

export const updateBanner = (bannerId, name, imageUrl) => {
  return (dispatch) => {
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/" +
          bannerId,
        {
          name: name,
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: UPDATE_BANNER,
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
          type: UPDATE_BANNER,
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
