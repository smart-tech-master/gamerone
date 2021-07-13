import {
  call,
  all,
  select,
  takeLatest,
  takeEvery,
  put,
  fork,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Nullable } from 'interfaces';
import * as ProfileApi from 'api/profile';
import * as FriendsApi from 'api/friends';
import * as ReferenceApi from 'api/referenceData';
import {
  UPDATE_PROFILE_REQUEST,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_BANNER_REQUEST,
  LOAD_PAGE_REQUEST,
  LOAD_PAGE_SUCCESS,
  LOAD_NEXT_PAGE,
  LOAD_INITIAL_PAGE,
  UPLOAD_AVATAR_SUCCESS,
  UPDATE_SPONSOR_REQUEST,
  DELETE_SPONSOR_REQUEST,
  CREATE_PRODUCT_REQUEST, // product
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  GET_PRIVACY_REQUEST,
  GET_PRIVACY_SUCCESS,
  UPDATE_PRIVACY_REQUEST,
  UPDATE_PRIVACY_SUCCESS,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  UPDATE_SPONSORS,
  UPDATE_PRODUCTS,
  UpdatePrivacyAction,
  UpdateProfileAction,
  UploadAvatarAction,
  UploadBannerAction,
  UpdateSponsorAction,
  DeleteSponsorAction,
  CreateProductAction,
  UpdateProductAction,
  DeleteProductAction,
  LoadPageAction,
  LoadNextPageAction,
  LoadPageActionPayload,
  LoadInitialPageAction,
  LoadPageSuccessActionPayload,
  UPDATE_EXPERIENCE_REQUEST,
  UpdateExperienceAction,
  DELETE_EXPERIENCE_REQUEST,
  DeleteExperienceAction,
  GET_EXPERIENCES_REQUEST,
  CreateExperienceAction,
  CREATE_EXPERIENCE_REQUEST,
  CREATE_SPONSOR_REQUEST,
  CreateSponsorAction,
  UPDATE_SOCIAL_REQUEST,
  UpdateSocialAction,
  DELETE_SOCIAL_REQUEST,
  DeleteSocialAction,
  GET_SOCIAL_REQUEST,
  GET_SOCIALS,
  CREATE_USER_GAME_REQUEST,
  CreateUserGameAction,
  UPDATE_USER_GAMES,
  DeleteUserGameAction,
  DELETE_USER_GAME_REQUEST,
  UpdateUserGameAction,
  UPDATE_USER_GAME_REQUEST,
  GET_GAME_PLATFORMS_REQUEST,
  UPDATE_GAME_PLATFORMS,
  GET_CURRENTLY_PLAYING_GAME_REQUEST,
  CURRENTLY_PLAYING_GAME,
  UPDATE_CURRENTLY_PLAYING_GAME_REQUEST,
  UpdateCurrentlyPlayingGameAction,
  DELETE_CURRENTLY_PLAYING_GAME_REQUEST,
  GET_ONLINE_STATUS_REQUEST,
  UPDATE_EXPERIENCES,
  GET_EXPERIENCES_SUCCESS,
} from './types';
import SettingsActions from './actions';
import RequestStatusActions from 'redux/request-status/actions';
import AuthActions from 'redux/auth/actions';

import { RootState } from 'redux/types';
import { UserPagedResponse } from 'interfaces/userPagedResponse';
import {
  UNFOLLOW_SUCCESS,
  UNBLOCK_SUCCESS,
  UnfollowSuccessAction,
  UnblockSuccessAction,
} from 'redux/profile/types';
import { Notify } from 'components/utility/Notify';
import { selectCurrentUserId } from '../auth/selectors';

const PagedApi = {
  followers: FriendsApi.followers,
  followings: FriendsApi.following,
  blocks: FriendsApi.blocks,
  games: ProfileApi.getUserGames,
};

/**
 * Update profile
 */
export function* updateProfileRequest() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, function* ({
    payload,
  }: UpdateProfileAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_PROFILE_REQUEST));

    try {
      const user = yield call(ProfileApi.updateProfile, payload);
      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));
      yield put(RequestStatusActions.finishRequest(UPDATE_PROFILE_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_PROFILE_REQUEST, err),
      );
    }
  });
}

/**
 * Avatar
 */
export function* uploadAvatarRequest() {
  yield takeLatest(UPLOAD_AVATAR_REQUEST, function* ({
    payload,
  }: UploadAvatarAction) {
    yield put(RequestStatusActions.startRequest(UPLOAD_AVATAR_REQUEST));
    try {
      const user = yield call(ProfileApi.uploadAvatar, payload);

      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));
      yield put({
        type: UPLOAD_AVATAR_SUCCESS,
      });
      yield put(RequestStatusActions.finishRequest(UPLOAD_AVATAR_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UPLOAD_AVATAR_REQUEST, err));
    }
  });
}

export function* uploadAvatarSuccess() {
  yield takeLatest(UPLOAD_AVATAR_SUCCESS, function* () {
    const path = yield select(
      (state: RootState) => state.router.location.pathname,
    );

    if (path && (path as string).includes('/signup')) {
      yield put(push('/signup/follows'));
    }
  });
}

/**
 * Banner
 */
export function* uploadBannerRequest() {
  yield takeLatest(UPLOAD_BANNER_REQUEST, function* ({
    payload,
  }: UploadBannerAction) {
    yield put(RequestStatusActions.startRequest(UPLOAD_BANNER_REQUEST));

    try {
      const user = yield call(ProfileApi.uploadBanner, payload);
      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));

      yield put(RequestStatusActions.finishRequest(UPLOAD_BANNER_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UPLOAD_BANNER_REQUEST, err));
    }
  });
}

/**
 * Create a sponsor
 */
export function* createSponsorRequest() {
  yield takeLatest(CREATE_SPONSOR_REQUEST, function* ({
    payload,
  }: CreateSponsorAction) {
    yield put(RequestStatusActions.startRequest(CREATE_SPONSOR_REQUEST));

    try {
      const sponsors = yield call(ProfileApi.createSponsor, payload);
      yield put({
        type: UPDATE_SPONSORS,
        payload: sponsors,
      });
      yield put(RequestStatusActions.finishRequest(CREATE_SPONSOR_REQUEST));
      Notify.success('Successfully added a sponsor');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(CREATE_SPONSOR_REQUEST, err),
      );
      Notify.error(
        'Something went wrong while creating a sponsor. Please try again',
      );
    }
  });
}

/**
 * Update a sponsor
 */
export function* updateSponsorRequest() {
  yield takeLatest(UPDATE_SPONSOR_REQUEST, function* ({
    payload,
  }: UpdateSponsorAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_SPONSOR_REQUEST));

    try {
      const sponsors = yield call(ProfileApi.updateSponsor, payload);
      yield put({
        type: UPDATE_SPONSORS,
        payload: sponsors,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_SPONSOR_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_SPONSOR_REQUEST, err),
      );
    }
  });
}

/**
 * Delete a sponsor
 */
export function* deleteSponsorRequest() {
  yield takeLatest(DELETE_SPONSOR_REQUEST, function* ({
    payload,
  }: DeleteSponsorAction) {
    yield put(RequestStatusActions.startRequest(DELETE_SPONSOR_REQUEST));

    try {
      const sponsors = yield call(ProfileApi.deleteSponsor, payload);
      yield put({
        type: UPDATE_SPONSORS,
        payload: sponsors,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_SPONSOR_REQUEST));
      Notify.success('You deleted a sponsor successfully');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_SPONSOR_REQUEST, err),
      );
      Notify.error(
        'Something went wrong while deleting a sponsor. Please try again',
      );
    }
  });
}

/**
 * Create a product
 */
export function* createProductRequest() {
  yield takeLatest(CREATE_PRODUCT_REQUEST, function* ({
    payload,
  }: CreateProductAction) {
    yield put(RequestStatusActions.startRequest(CREATE_PRODUCT_REQUEST));

    try {
      const products = yield call(ProfileApi.createProduct, payload);
      yield put({
        type: UPDATE_PRODUCTS,
        payload: products,
      });
      yield put(RequestStatusActions.finishRequest(CREATE_PRODUCT_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(CREATE_PRODUCT_REQUEST, err),
      );
    }
  });
}

/**
 * Update a product
 */
export function* updateProductRequest() {
  yield takeLatest(UPDATE_PRODUCT_REQUEST, function* ({
    payload,
  }: UpdateProductAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_PRODUCT_REQUEST));

    try {
      const products = yield call(ProfileApi.updateProduct, payload);
      yield put({
        type: UPDATE_PRODUCTS,
        payload: products,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_PRODUCT_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_PRODUCT_REQUEST, err),
      );
    }
  });
}

/**
 * Delete a product
 */
export function* deleteProductRequest() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, function* ({
    payload,
  }: DeleteProductAction) {
    yield put(RequestStatusActions.startRequest(DELETE_PRODUCT_REQUEST));

    try {
      const products = yield call(ProfileApi.deleteProduct, payload);
      yield put({
        type: UPDATE_PRODUCTS,
        payload: products,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_PRODUCT_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_PRODUCT_REQUEST, err),
      );
    }
  });
}

/**
 * Social Networks
 */

/**
 * Get a social
 */
export function* getSocialRequest() {
  yield takeLatest(GET_SOCIAL_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_SOCIAL_REQUEST));

    try {
      const socials = yield call(ProfileApi.getSocials);
      yield put({
        type: GET_SOCIALS,
        payload: socials,
      });
      yield put(RequestStatusActions.finishRequest(GET_SOCIAL_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(GET_SOCIAL_REQUEST, err));
    }
  });
}

// Update a social
export function* updateSocialRequest() {
  yield takeLatest(UPDATE_SOCIAL_REQUEST, function* ({
    payload,
  }: UpdateSocialAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_SOCIAL_REQUEST));

    try {
      const socials = yield call(ProfileApi.updateSocial, payload);
      yield put({
        type: GET_SOCIALS,
        payload: socials,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_SOCIAL_REQUEST));
      Notify.success('Successfully updated your social networks');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UPDATE_SOCIAL_REQUEST, err));
      Notify.error(
        'Something went wrong while updating your social networks. Please try again',
      );
    }
  });
}

/**
 * Delete a social
 */
export function* deleteSocialRequest() {
  yield takeLatest(DELETE_SOCIAL_REQUEST, function* ({
    payload,
  }: DeleteSocialAction) {
    yield put(RequestStatusActions.startRequest(DELETE_SOCIAL_REQUEST));

    try {
      const socials = yield call(ProfileApi.deleteSocial, payload);
      yield put({
        type: GET_SOCIALS,
        payload: socials,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_SOCIAL_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_SOCIAL_REQUEST, err));
    }
  });
}

/**
 * Unfollow, Unblock success
 */
export function* unfollowSuccess() {
  yield takeEvery(UNFOLLOW_SUCCESS, function* ({
    payload,
  }: UnfollowSuccessAction) {
    yield put(SettingsActions.removeFollowing(payload));
  });
}

export function* unblockSuccess() {
  yield takeEvery(UNBLOCK_SUCCESS, function* ({
    payload,
  }: UnblockSuccessAction) {
    yield put(SettingsActions.removeBlocked(payload));
  });
}

/**
 * Followers, followings, blocks, games pagination
 */
export function* loadPageRequest() {
  yield takeEvery(LOAD_PAGE_REQUEST, function* ({ payload }: LoadPageAction) {
    const { key, page, dataApi } = payload;
    const REQUEST_NAME = LOAD_PAGE_REQUEST + '/' + key;

    yield put(RequestStatusActions.startRequest(REQUEST_NAME));

    try {
      let response;
      if (key === 'games') {
        const userId = yield select(selectCurrentUserId);
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

/**
 * Privacy
 */
export function* getPrivacyRequest() {
  yield takeLatest(GET_PRIVACY_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_PRIVACY_REQUEST));

    try {
      const response = yield call(ProfileApi.getPrivacySettings);
      yield put({
        type: GET_PRIVACY_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(GET_PRIVACY_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(GET_PRIVACY_REQUEST, err));
    }
  });
}

export function* updatePrivacyRequest() {
  yield takeLatest(UPDATE_PRIVACY_REQUEST, function* ({
    payload,
  }: UpdatePrivacyAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_PRIVACY_REQUEST));

    try {
      const response = yield call(ProfileApi.updatePrivacySettings, payload);
      yield put({
        type: UPDATE_PRIVACY_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_PRIVACY_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_PRIVACY_REQUEST, err),
      );
    }
  });
}

/**
 * Update experience
 */
export function* updateExperienceRequest() {
  yield takeLatest(UPDATE_EXPERIENCE_REQUEST, function* ({
    payload,
  }: UpdateExperienceAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_EXPERIENCE_REQUEST));

    try {
      const experience = yield call(
        ProfileApi.updateExperience,
        payload.id,
        payload.data,
      );
      yield put({
        type: UPDATE_EXPERIENCES,
        payload: experience,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_EXPERIENCE_REQUEST));
      Notify.success('Successfully updated experience');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_EXPERIENCE_REQUEST, err),
      );
    }
  });
}

export function* createExperienceRequest() {
  yield takeLatest(CREATE_EXPERIENCE_REQUEST, function* ({
    payload,
  }: CreateExperienceAction) {
    yield put(RequestStatusActions.startRequest(CREATE_EXPERIENCE_REQUEST));

    try {
      const experiences = yield call(ProfileApi.createExperience, payload);
      yield put({
        type: UPDATE_EXPERIENCES,
        payload: experiences,
      });
      yield put(RequestStatusActions.finishRequest(CREATE_EXPERIENCE_REQUEST));
      Notify.success('Successfully added experience');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(CREATE_EXPERIENCE_REQUEST, err),
      );
    }
  });
}

export function* deleteExperienceRequest() {
  yield takeLatest(DELETE_EXPERIENCE_REQUEST, function* ({
    payload,
  }: DeleteExperienceAction) {
    yield put(RequestStatusActions.startRequest(DELETE_EXPERIENCE_REQUEST));

    try {
      const experiences = yield call(ProfileApi.deleteExperience, payload);
      yield put({
        type: UPDATE_EXPERIENCES,
        payload: experiences,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_EXPERIENCE_REQUEST));
      Notify.success('Successfully deleted experience');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_EXPERIENCE_REQUEST, err),
      );
    }
  });
}

export function* getExperiencesRequest() {
  yield takeLatest(GET_EXPERIENCES_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_EXPERIENCES_REQUEST));

    try {
      const experiences = yield call(ProfileApi.getExperiences);
      yield put({
        type: GET_EXPERIENCES_SUCCESS,
        payload: experiences,
      });
      yield put(RequestStatusActions.finishRequest(GET_EXPERIENCES_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_EXPERIENCES_REQUEST, err),
      );
    }
  });
}

/*
 *   Load profile
 *  * Load self profile
 */
export function* loadProfileRequest() {
  yield takeLatest(LOAD_PROFILE_REQUEST, function* () {
    yield put(SettingsActions.getPrivacy());
    yield put(RequestStatusActions.startRequest(LOAD_PROFILE_REQUEST));

    try {
      const userId = yield select(selectCurrentUserId);
      const response = yield call(ProfileApi.getProfile, userId);
      yield put({
        type: LOAD_PROFILE_SUCCESS,
        payload: response,
      });

      yield put(RequestStatusActions.finishRequest(LOAD_PROFILE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(LOAD_PROFILE_REQUEST, err));
    }
  });
}

/**
 * Games
 */

// Get game platforms
export function* getGamePlatformsRequest() {
  yield takeLatest(GET_GAME_PLATFORMS_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_GAME_PLATFORMS_REQUEST));

    try {
      const gamePlatforms = yield call(ReferenceApi.gamePlatforms);
      yield put({
        type: UPDATE_GAME_PLATFORMS,
        payload: gamePlatforms,
      });
      yield put(RequestStatusActions.finishRequest(GET_GAME_PLATFORMS_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_GAME_PLATFORMS_REQUEST, err),
      );
    }
  });
}

// Add a  UserGame
export function* createUserGameRequest() {
  yield takeLatest(CREATE_USER_GAME_REQUEST, function* ({
    payload,
  }: CreateUserGameAction) {
    yield put(RequestStatusActions.startRequest(CREATE_USER_GAME_REQUEST));

    try {
      const userGames = yield call(ProfileApi.createUserGame, payload);
      yield put({
        type: UPDATE_USER_GAMES,
        payload: userGames,
      });
      yield put(RequestStatusActions.finishRequest(CREATE_USER_GAME_REQUEST));
      Notify.success('Successfully added a game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(CREATE_USER_GAME_REQUEST, err),
      );
      Notify.error(
        'Something went wrong while adding a game. Please try again',
      );
    }
  });
}

// Update a  UserGame
export function* updateUserGameRequest() {
  yield takeLatest(UPDATE_USER_GAME_REQUEST, function* ({
    payload,
  }: UpdateUserGameAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_USER_GAME_REQUEST));

    try {
      const userGames = yield call(ProfileApi.updateUserGame, payload);
      yield put({
        type: UPDATE_USER_GAMES,
        payload: userGames,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_USER_GAME_REQUEST));
      Notify.success('Successfully updated a game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_USER_GAME_REQUEST, err),
      );
      Notify.error(
        'Something went wrong while updating a game. Please try again',
      );
    }
  });
}

// Delete a  UserGame
export function* deleteUserGameRequest() {
  yield takeLatest(DELETE_USER_GAME_REQUEST, function* ({
    payload,
  }: DeleteUserGameAction) {
    yield put(RequestStatusActions.startRequest(DELETE_USER_GAME_REQUEST));

    try {
      const userGames = yield call(ProfileApi.deleteUserGame, payload);
      yield put({
        type: UPDATE_USER_GAMES,
        payload: userGames,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_USER_GAME_REQUEST));
      Notify.success('Successfully deleted a game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_USER_GAME_REQUEST, err),
      );
      Notify.error(
        'Something went wrong while deleting a game. Please try again',
      );
    }
  });
}

/**
 * Get currently playing game
 */
export function* getCurrentlyPlayingGameRequest() {
  yield takeLatest(GET_CURRENTLY_PLAYING_GAME_REQUEST, function* () {
    yield put(
      RequestStatusActions.startRequest(GET_CURRENTLY_PLAYING_GAME_REQUEST),
    );

    try {
      const userId = yield select(selectCurrentUserId);
      const currentlyPlayingGame = yield call(
        ProfileApi.getCurrentlyPlayingGame,
        userId,
      );
      yield put({
        type: CURRENTLY_PLAYING_GAME,
        payload: currentlyPlayingGame,
      });
      yield put(
        RequestStatusActions.finishRequest(GET_CURRENTLY_PLAYING_GAME_REQUEST),
      );
      Notify.success('Successfully retrieved a currently playing game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(
          GET_CURRENTLY_PLAYING_GAME_REQUEST,
          err,
        ),
      );
      Notify.error(
        'Something went wrong while retrieving a currently playing game. Please try again',
      );
    }
  });
}

/**
 * Update currently playing game
 */
export function* updateCurrentlyPlayingGameRequest() {
  yield takeLatest(UPDATE_CURRENTLY_PLAYING_GAME_REQUEST, function* ({
    payload,
  }: UpdateCurrentlyPlayingGameAction) {
    yield put(
      RequestStatusActions.startRequest(UPDATE_CURRENTLY_PLAYING_GAME_REQUEST),
    );

    try {
      const currentlyPlayingGame = yield call(
        ProfileApi.updateCurrentlyPlayingGame,
        payload,
      );
      yield put({
        type: CURRENTLY_PLAYING_GAME,
        payload: currentlyPlayingGame,
      });
      yield put(
        RequestStatusActions.finishRequest(
          UPDATE_CURRENTLY_PLAYING_GAME_REQUEST,
        ),
      );
      Notify.success('Successfully updated a currently playing game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(
          UPDATE_CURRENTLY_PLAYING_GAME_REQUEST,
          err,
        ),
      );
      Notify.error(
        'Something went wrong while updating a currently playing game. Please try again',
      );
    }
  });
}

/**
 * Delete currently playing game
 */
export function* deleteCurrentlyPlayingGameRequest() {
  yield takeLatest(DELETE_CURRENTLY_PLAYING_GAME_REQUEST, function* () {
    yield put(
      RequestStatusActions.startRequest(DELETE_CURRENTLY_PLAYING_GAME_REQUEST),
    );

    try {
      const currentlyPlayingGame = yield call(
        ProfileApi.deleteCurrentlyPlayingGame,
      );
      yield put({
        type: CURRENTLY_PLAYING_GAME,
        payload: currentlyPlayingGame,
      });
      yield put(
        RequestStatusActions.finishRequest(
          DELETE_CURRENTLY_PLAYING_GAME_REQUEST,
        ),
      );
      Notify.success('Successfully deleted a currently playing game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(
          DELETE_CURRENTLY_PLAYING_GAME_REQUEST,
          err,
        ),
      );
      Notify.error(
        'Something went wrong while deleting a currently playing game. Please try again',
      );
    }
  });
}

/**
 * Get online status
 */
export function* getOnlineStatusRequest() {
  yield takeLatest(GET_ONLINE_STATUS_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_ONLINE_STATUS_REQUEST));

    try {
      const currentlyPlayingGame = yield call(ProfileApi.getOnlineStatus);
      yield put({
        type: CURRENTLY_PLAYING_GAME,
        payload: currentlyPlayingGame,
      });
      yield put(RequestStatusActions.finishRequest(GET_ONLINE_STATUS_REQUEST));
      Notify.success('Successfully retrieved online status');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_ONLINE_STATUS_REQUEST, err),
      );
      Notify.error(
        'Something went wrong while retrieving online status. Please try again',
      );
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(loadProfileRequest),
    fork(updateProfileRequest),

    fork(uploadAvatarRequest),
    fork(uploadBannerRequest),
    fork(uploadAvatarSuccess),

    fork(createSponsorRequest),
    fork(updateSponsorRequest),
    fork(deleteSponsorRequest),

    fork(createProductRequest),
    fork(updateProductRequest),
    fork(deleteProductRequest),

    fork(createExperienceRequest),
    fork(updateExperienceRequest),
    fork(deleteExperienceRequest),
    fork(getExperiencesRequest),

    fork(loadPageRequest),
    fork(getGamePlatformsRequest),
    fork(updateSocialRequest),
    fork(deleteSocialRequest),
    fork(getSocialRequest),

    fork(createUserGameRequest),
    fork(updateUserGameRequest),
    fork(deleteUserGameRequest),

    fork(loadPageRequest),
    fork(loadNextPage),
    fork(loadInitialPage),

    fork(unfollowSuccess),
    fork(unblockSuccess),

    fork(getPrivacyRequest),
    fork(updatePrivacyRequest),

    fork(getCurrentlyPlayingGameRequest),
    fork(updateCurrentlyPlayingGameRequest),
    fork(deleteCurrentlyPlayingGameRequest),
    fork(getOnlineStatusRequest),
  ]);
}
