import axios from "axios";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_LOGGED = "AUTH_LOGGED";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const GET_ALL_USER = "GET_ALL_USER";

export const login = (email, password) => {
  return (dispatch) => {
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: AUTH_LOGIN,
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
          type: AUTH_LOGIN,
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

export const register = ({
  email,
  name,
  password,
  role,
  passwordRepeat,
  phoneNumber,
  profilePictureUrl,
}) => {
  return (dispatch) => {
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        {
          email: email,
          name: name,
          password: password,
          passwordRepeat: passwordRepeat,
          role: role,
          profilePictureUrl: profilePictureUrl,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // handle success
        dispatch({
          type: AUTH_REGISTER,
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
          type: AUTH_REGISTER,
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

const token = sessionStorage.getItem("token");

export const updateProfile = ({
  name,
  email,
  phoneNumber,
  profilePictureUrl,
}) => {
    console.log(name);
  return (dispatch) => {
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        {
          email: email,
          name: name,
          profilePictureUrl: profilePictureUrl,
          phoneNumber: phoneNumber,
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
          type: UPDATE_PROFILE,
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
          type: UPDATE_PROFILE,
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

export const getLoggedUser = () => {
  return (dispatch) => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          Authorization: "Bearer " + token,
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then(function (response) {
        // handle success
        dispatch({
          type: AUTH_LOGGED,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        // Lakukan sesuatu dengan data yang diterima, seperti dispatch action
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: AUTH_LOGGED,
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

export const getAllUser = () => {
  return (dispatch) => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
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
          type: GET_ALL_USER,
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
          type: GET_ALL_USER,
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
