import {
  call,
  all,
  put,
  fork,
  takeLatest,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as ProfileApi from 'api/profile';
import * as FriendsApi from 'api/friends';
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  BLOCK_REQUEST,
  BLOCK_SUCCESS,
  UNBLOCK_REQUEST,
  UNBLOCK_SUCCESS,
  SET_RESOLVED_CONTENT,
  MULTI_FOLLOW_REQUEST,
  MULTI_FOLLOW_SUCCESS,
  GetProfileAction,
  SetResolvedContentAction,
  FollowAction,
  UnfollowAction,
  BlockAction,
  UnblockAction,
  MultiFollowAction,
  GET_PROFILE_LAYOUT_REQUEST,
  GET_PROFILE_LAYOUT_SUCCESS,
  GET_PROFILE_LAYOUT_ERROR,
  SET_CURRENT_PROFILE_LAYOUT_REQUEST,
  SET_CURRENT_PROFILE_LAYOUT_ERROR,
  SetCurrentProfileLayoutAction,
  LOAD_PAGE_REQUEST,
  LoadPageAction,
  LOAD_PAGE_SUCCESS,
  LoadPageSuccessActionPayload,
  LOAD_INITIAL_PAGE,
  LoadInitialPageAction,
  LOAD_NEXT_PAGE,
  LoadNextPageAction,
  LoadPageActionPayload,
} from './types';
import { selectCurrentProfileId } from './selectors';

import RequestStatusActions from 'redux/request-status/actions';
import ProfileActions from './actions';
import PostActions from 'redux/post/actions';
import { RootState, LOAD_STATE } from 'redux/types';
import { UserPagedResponse } from 'interfaces/userPagedResponse';
import { Nullable } from 'interfaces';
import { Notify } from 'components/utility/Notify';
import { UPDATE_LAYOUT_SETTINGS } from 'redux/settings/types';

const PagedApi = {
  games: ProfileApi.getUserGames,
};

/**
 * Get profile
 */
export function* getProfileRequest() {
  yield takeLatest(GET_PROFILE_REQUEST, function* ({
    payload,
  }: GetProfileAction) {
    yield put(RequestStatusActions.startRequest(GET_PROFILE_REQUEST));

    try {
      const response = yield call(ProfileApi.getProfile, payload);
      yield put({
        type: GET_PROFILE_SUCCESS,
        payload: response,
      });

      yield put(RequestStatusActions.finishRequest(GET_PROFILE_REQUEST));
    } catch (err) {
      yield put({ type: GET_PROFILE_ERROR });

      yield put(RequestStatusActions.finishRequest(GET_PROFILE_REQUEST, err));
    }
  });
}

/**
 * Get profile layout
 */
export function* getProfileLayoutRequest() {
  yield takeLatest(GET_PROFILE_LAYOUT_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_PROFILE_LAYOUT_REQUEST));

    try {
      const response = yield call(ProfileApi.getProfileLayout);
      yield put({
        type: GET_PROFILE_LAYOUT_SUCCESS,
        payload: response,
      });

      yield put(RequestStatusActions.finishRequest(GET_PROFILE_LAYOUT_REQUEST));
    } catch (err) {
      yield put({ type: GET_PROFILE_LAYOUT_ERROR });

      yield put(
        RequestStatusActions.finishRequest(GET_PROFILE_LAYOUT_REQUEST, err),
      );
    }
  });
}

export function* setProfileLayoutRequest() {
  yield takeLatest(SET_CURRENT_PROFILE_LAYOUT_REQUEST, function* ({
    payload,
  }: SetCurrentProfileLayoutAction) {
    yield put(
      RequestStatusActions.startRequest(SET_CURRENT_PROFILE_LAYOUT_REQUEST),
    );

    try {
      const response = yield call(ProfileApi.setProfileLayout, payload);

      yield put({
        type: GET_PROFILE_LAYOUT_SUCCESS,
        payload: response,
      });

      yield put({
        type: UPDATE_LAYOUT_SETTINGS,
        payload: response,
      });

      yield put(
        RequestStatusActions.finishRequest(SET_CURRENT_PROFILE_LAYOUT_REQUEST),
      );
      Notify.success('Successfully updated your profile layout settings');
    } catch (err) {
      yield put({ type: SET_CURRENT_PROFILE_LAYOUT_ERROR });

      yield put(
        RequestStatusActions.finishRequest(
          SET_CURRENT_PROFILE_LAYOUT_REQUEST,
          err,
        ),
      );
      Notify.error(
        'Something went wrong while updating your profile layout settings. Please try again',
      );
    }
  });
}

export function* setResolvedContent() {
  yield takeLatest(SET_RESOLVED_CONTENT, function* ({
    payload,
  }: SetResolvedContentAction) {
    if (payload.contentId) {
      yield put(ProfileActions.getProfile(payload.contentId));
      yield put(PostActions.getPosts(payload.contentId));
    } else {
      throw new Error('Content id is undefined');
    }
  });
}

/**
 * FOLLOW
 *
 * Friends api responses are placeholders [temporary]
 */
export function* followRequest() {
  yield takeLatest(FOLLOW_REQUEST, function* ({ payload }: FollowAction) {
    yield put(RequestStatusActions.startRequest(FOLLOW_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.follow, id);

      yield put({ type: FOLLOW_SUCCESS });

      yield put(RequestStatusActions.finishRequest(FOLLOW_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(FOLLOW_REQUEST, err));
    }
  });
}

export function* unfollowRequest() {
  yield takeLatest(UNFOLLOW_REQUEST, function* ({ payload }: UnfollowAction) {
    yield put(RequestStatusActions.startRequest(UNFOLLOW_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.unfollow, id);

      yield put({ type: UNFOLLOW_SUCCESS, payload: id });

      yield put(RequestStatusActions.finishRequest(UNFOLLOW_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UNFOLLOW_REQUEST, err));
    }
  });
}

export function* blockRequest() {
  yield takeLatest(BLOCK_REQUEST, function* ({ payload }: BlockAction) {
    yield put(RequestStatusActions.startRequest(BLOCK_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.block, id);

      yield put({ type: BLOCK_SUCCESS });

      yield put(RequestStatusActions.finishRequest(BLOCK_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(BLOCK_REQUEST, err));
    }
  });
}

export function* unblockRequest() {
  yield takeLatest(UNBLOCK_REQUEST, function* ({ payload }: UnblockAction) {
    yield put(RequestStatusActions.startRequest(UNBLOCK_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.unblock, id);

      yield put({ type: UNBLOCK_SUCCESS, payload: id });

      yield put(RequestStatusActions.finishRequest(UNBLOCK_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UNBLOCK_REQUEST, err));
    }
  });
}

export function* multiFollowRequest() {
  yield takeLatest(MULTI_FOLLOW_REQUEST, function* ({
    payload,
  }: MultiFollowAction) {
    // this is when user clicks Finish on DiscoverFollows page
    yield put(RequestStatusActions.startRequest(MULTI_FOLLOW_REQUEST));

    try {
      if (payload.userIds.length > 0)
        yield call(FriendsApi.multiFollow, payload);

      yield put({
        type: MULTI_FOLLOW_SUCCESS,
      });
      yield put(RequestStatusActions.finishRequest(MULTI_FOLLOW_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(MULTI_FOLLOW_REQUEST, err));
    } finally {
      yield put({ type: LOAD_STATE });
    }
  });
}

export function* multiFollowSuccess() {
  yield takeLatest(MULTI_FOLLOW_SUCCESS, function* () {
    yield put(push('/'));
  });
}

/**
 * Pagination
 */
export function* loadPageRequest() {
  yield takeEvery(LOAD_PAGE_REQUEST, function* ({ payload }: LoadPageAction) {
    const { key, page, dataApi } = payload;
    const REQUEST_NAME = LOAD_PAGE_REQUEST + '/' + key;

    yield put(RequestStatusActions.startRequest(REQUEST_NAME));

    try {
      let response;
      if (key === 'games') {
        const userId = yield select(selectCurrentProfileId);
        if (userId) {
          response = yield call<typeof dataApi>(dataApi, userId, page);
        } else {
          yield put(RequestStatusActions.finishRequest(REQUEST_NAME, null));
        }
      } else {
        response = yield call<typeof dataApi>(dataApi, page);
      }
      yield put({
        type: LOAD_PAGE_SUCCESS,
        payload: {
          key,
          response,
        } as LoadPageSuccessActionPayload,
      });

      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, null));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, err));
    }
  });
}

export function* loadInitialPage() {
  yield takeEvery(LOAD_INITIAL_PAGE, function* ({
    payload: key,
  }: LoadInitialPageAction) {
    const currentResponse = (yield select(
      ({ Settings }: RootState) => Settings.pageResponse[key],
    )) as Nullable<UserPagedResponse>;

    if (currentResponse === null) {
      yield put({
        type: LOAD_NEXT_PAGE,
        payload: key,
      });
    }
  });
}

export function* loadNextPage() {
  yield takeEvery(LOAD_NEXT_PAGE, function* ({
    payload: key,
  }: LoadNextPageAction) {
    const currentResponse = (yield select(
      ({ Settings }: RootState) => Settings.pageResponse[key],
    )) as Nullable<UserPagedResponse>;

    const requestPayload = {
      key,
      page: currentResponse ? currentResponse.currentPage + 1 : 0,
      dataApi: PagedApi[key],
    } as LoadPageActionPayload;

    if (!currentResponse || requestPayload.page <= currentResponse.lastPage)
      yield put({
        type: LOAD_PAGE_REQUEST,
        payload: requestPayload,
      });
    else {
      // Reached page end
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getProfileRequest),
    fork(setResolvedContent),
    fork(followRequest),
    fork(unfollowRequest),
    fork(blockRequest),
    fork(unblockRequest),

    fork(getProfileLayoutRequest),
    fork(setProfileLayoutRequest),

    fork(multiFollowRequest),
    fork(multiFollowSuccess),

    fork(loadPageRequest),
    fork(loadNextPage),
    fork(loadInitialPage),
  ]);
}
