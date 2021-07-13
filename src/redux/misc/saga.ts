import { call, all, takeEvery, put, fork } from 'redux-saga/effects';

import * as MiscApi from 'api/misc';
import {
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DelteUploadedFileAction,
} from './types';
import RequestStatusActions from 'redux/request-status/actions';

/**
 * Delete file
 */
export function* deleteFileRequest() {
  yield takeEvery(DELETE_FILE_REQUEST, function* ({
    payload,
  }: DelteUploadedFileAction) {
    yield put(RequestStatusActions.startRequest(DELETE_FILE_REQUEST));
    try {
      yield call(MiscApi.deleteFile, payload);

      yield put({
        type: DELETE_FILE_SUCCESS,
        payload,
      });

      yield put(RequestStatusActions.finishRequest(DELETE_FILE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_FILE_REQUEST, err));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(deleteFileRequest)]);
}
