import axios from "axios";

export const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const getCategoryList = () => {
  return (dispatch) => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: GET_CATEGORY_LIST,
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
          type: GET_CATEGORY_LIST,
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

export const getCategoryById = (categoryId) => {
    return (dispatch) => {
      axios
        .get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/" +
            categoryId,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        )
        .then(function (response) {
          // handle success
          dispatch({
            type: GET_CATEGORY_BY_ID,
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
            type: GET_CATEGORY_BY_ID,
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


  export const deleteCategory = (bannerId) => {
    return (dispatch) => {
      axios
        .delete(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/" +
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
            type: DELETE_CATEGORY,
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
            type: DELETE_CATEGORY,
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

  export const addCategory = (name, imageUrl) => {
    return (dispatch) => {
      axios
        .post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
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
            type: ADD_CATEGORY,
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
            type: ADD_CATEGORY,
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

  export const updateCategory = (categoryId, name, imageUrl) => {
    return (dispatch) => {
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${categoryId}`,
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
            type: UPDATE_CATEGORY,
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
            type: UPDATE_CATEGORY,
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