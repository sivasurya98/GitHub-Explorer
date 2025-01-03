import {all, fork} from 'redux-saga/effects';
import * as profilesaga from '../src/Container/Profile-saga'

export function* rootSaga() {
  
  const profile = Object.values(profilesaga).map(saga => {
    return fork(saga);
  });

  yield all([
    ...profile
  ]);
}
