import axios from "axios";

export const UPLOAD_IMAGE = "UPLOAD_IMAGE";

export const uploadImage = (image) => {
  return (dispatch) => {
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        image,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // handle success
        dispatch({
          type: UPLOAD_IMAGE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(response.data);
        // Lakukan sesuatu dengan data yang diterima, seperti dispatch action
      })
      .catch((error) => {
        // handle error
        dispatch({
          type: UPLOAD_IMAGE,
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
