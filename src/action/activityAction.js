import axios from "axios";

export const GET_ACTIVITY_LIST = "GET_ACITIVTY_LIST";
export const GET_ACTIVITY_BY_ID = "GET_ACTIVITY_BY_ID";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";

export const getActivityList = () => {
  return (dispatch) => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: GET_ACTIVITY_LIST,
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
          type: GET_ACTIVITY_LIST,
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

export const getActivityById = (activityId) => {
  return (dispatch) => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/" +
          activityId,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: GET_ACTIVITY_BY_ID,
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
          type: GET_ACTIVITY_BY_ID,
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

export const deleteActivity = (bannerId) => {
  return (dispatch) => {
    axios
      .delete(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/" +
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
          type: DELETE_ACTIVITY,
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
          type: DELETE_ACTIVITY,
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

export const addActivity = ({
  categoryId,
  title,
  description,
  imageUrls,
  price,
  price_discount,
  rating,
  total_reviews,
  facilities,
  address,
  province,
  city,
  location_maps,
}) => {
  return (dispatch) => {
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
        {
          categoryId: categoryId,
          title: title,
          description: description,
          imageUrls: [imageUrls],
          price:parseFloat(price),
          price_discount: parseFloat(price_discount),
          rating: parseFloat(rating),
          total_reviews: parseFloat(total_reviews),
          facilities: facilities,
          address: address,
          province: province,
          city: city,
          location_maps: location_maps,
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
          type: ADD_ACTIVITY,
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
          type: ADD_ACTIVITY,
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


export const updateActivity = ({
    activityId,
    categoryId,
    title,
    description,
    imageUrls,
    price,
    price_discount,
    rating,
    total_reviews,
    facilities,
    address,
    province,
    city,
    location_maps,
  }) => {
    return (dispatch) => {
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activityId}`,
          {
            categoryId: categoryId,
            title: title,
            description: description,
            imageUrls: imageUrls,
            price:parseFloat(price),
            price_discount: parseFloat(price_discount),
            rating: parseFloat(rating),
            total_reviews: parseFloat(total_reviews),
            facilities: facilities,
            address: address,
            province: province,
            city: city,
            location_maps: location_maps,
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
            type: UPDATE_ACTIVITY,
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
            type: UPDATE_ACTIVITY,
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