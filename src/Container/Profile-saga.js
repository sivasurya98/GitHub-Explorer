import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { Api } from '../utils/Api';
import { profileSuccess, profileFailure } from './action';
import { GITHUB_PROFILE_REQUEST } from './actionType';

function* profile(action) {
  console.log('action', action.payload.query);
  const query = action.payload.query;
  try {
    const url = `${Api.Apiurl}q=${encodeURIComponent(query)}`;
    const response = yield call(axios.get, url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.total_count === 0) {
      throw new Error('No repositories found for the given query.');
    }
    yield put(profileSuccess(response.data));
  } catch (error) {
    let errorMessage = 'An unknown error occurred. Please try again later.';
    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = 'No repositories found for the given query.';
      } else if (error.response.status === 500) {
        errorMessage = 'Server is currently unavailable. Please try again later.';
      } else {
        errorMessage = `Unexpected error: ${error.response.data.message || error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else {
      errorMessage = error.message;
    }

    console.log('Error:', errorMessage);
    yield put(profileFailure(errorMessage));
  }
}

export function* watchprofile() {
  yield takeLatest(GITHUB_PROFILE_REQUEST, profile);
}
