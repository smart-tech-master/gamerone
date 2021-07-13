import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import profileSagas from './profile/saga';
import settingsSagas from './settings/saga';
import postSagas from './post/saga';
import postFormSagas from './post-form/saga';
import miscSagas from './misc/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    profileSagas(),
    settingsSagas(),
    postSagas(),
    postFormSagas(),
    miscSagas(),
  ]);
}
