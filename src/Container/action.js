import { GITHUB_PROFILE_REQUEST, GITHUB_PROFILE_SUCCESS, GITHUB_PROFILE_FAILURE } from "./actionType";


export const profileRequest = (data) => ({
    type: GITHUB_PROFILE_REQUEST,
    payload: data,
  });
  
  export const profileSuccess = (data) => ({
    type: GITHUB_PROFILE_SUCCESS,
    payload: data,
  });
  
  export const profileFailure = (error) => ({
    type: GITHUB_PROFILE_FAILURE,
    payload: error,
  });