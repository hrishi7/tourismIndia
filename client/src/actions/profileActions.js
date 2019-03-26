import { PROFILE_LOADING, GET_PROFILE, GET_ERRORS } from "./types";
import axios from "axios";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Upload Image
export const uploadImage = imgSrc => dispatch => {
  axios
    .post("/api/profile/image", imgSrc)
    .then(res => {
      console.log("Success");
    })
    .catch(err => console.log("Upload Failed"));
};
