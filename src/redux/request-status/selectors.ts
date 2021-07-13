import { createSelector } from 'reselect';
import { initState } from './reducer';
import { RootState } from '../types';
import {
  DELETE_EXPERIENCE_REQUEST,
  GET_EXPERIENCES_REQUEST,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_BANNER_REQUEST,
  CREATE_SPONSOR_REQUEST,
  UPDATE_PRIVACY_REQUEST,
  CREATE_EXPERIENCE_REQUEST,
} from 'redux/settings/types';

import {
  UPDATE_SPONSOR_REQUEST,
  DELETE_SPONSOR_REQUEST,
  CREATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  UPDATE_SOCIAL_REQUEST,
  CREATE_USER_GAME_REQUEST,
  UPDATE_USER_GAME_REQUEST,
  DELETE_USER_GAME_REQUEST,
  UPDATE_CURRENTLY_PLAYING_GAME_REQUEST,
  DELETE_CURRENTLY_PLAYING_GAME_REQUEST,
} from 'redux/settings/types';

import { ADD_POST_REQUEST } from 'redux/post/types';

import {
  MULTI_FOLLOW_REQUEST,
  SET_CURRENT_PROFILE_LAYOUT_REQUEST,
  GET_PROFILE_LAYOUT_REQUEST,
} from 'redux/profile/types';
import { UPLOAD_IMAGE_REQUEST } from 'redux/post-form/types';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from 'redux/auth/types';

export const selectGlobal = (state: RootState) =>
  state.RequestStatus || initState;

export const selectStatus = createSelector(
  selectGlobal,
  (state) => state.status,
);

export const selectInProgressRequests = createSelector(
  selectGlobal,
  (state) => state.progressingRequests,
);

export const selectInProgressCount = createSelector(
  selectInProgressRequests,
  (requests) => requests.length,
);

/**
 * Auth status
 */
export const selectLoginStatus = createSelector(selectStatus, (status) =>
  status.get(LOGIN_REQUEST),
);

export const selectSignupStatus = createSelector(selectStatus, (status) =>
  status.get(SIGNUP_REQUEST),
);

export const selectMultiFollowStatus = createSelector(selectStatus, (status) =>
  status.get(MULTI_FOLLOW_REQUEST),
);

/**
 * Settings
 */
export const selectUpdateProfileStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_PROFILE_REQUEST),
);

export const selectUploadAvatarStatus = createSelector(selectStatus, (status) =>
  status.get(UPLOAD_AVATAR_REQUEST),
);

export const selectUploadBannerStatus = createSelector(selectStatus, (status) =>
  status.get(UPLOAD_BANNER_REQUEST),
);

/**
 * New Post
 */
export const selectPostFormImageUploadStatus = createSelector(
  selectStatus,
  (status) => status.get(UPLOAD_IMAGE_REQUEST),
);

export const selectPostFormStatus = createSelector(selectStatus, (status) =>
  status.get(ADD_POST_REQUEST),
);

// experience status
export const selectAddExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(CREATE_EXPERIENCE_REQUEST),
);

export const selectDeleteExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(DELETE_EXPERIENCE_REQUEST),
);

export const selectGetExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(GET_EXPERIENCES_REQUEST),
);

export const selectUpdateExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_EXPERIENCE_REQUEST),
);

// sponsor status
export const selectCreateSponsorStatus = createSelector(
  selectStatus,
  (status) => status.get(CREATE_SPONSOR_REQUEST),
);

export const selectUpdateSponsorStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_SPONSOR_REQUEST),
);

export const selectDeleteSponsorStatus = createSelector(
  selectStatus,
  (status) => status.get(DELETE_SPONSOR_REQUEST),
);

/**
 * Store status
 */
export const selectCreateStoreStatus = createSelector(selectStatus, (status) =>
  status.get(CREATE_PRODUCT_REQUEST),
);

export const selectUpdateStoreStatus = createSelector(selectStatus, (status) =>
  status.get(UPDATE_PRODUCT_REQUEST),
);

export const selectDeleteStoreStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_PRODUCT_REQUEST),
);

export const selectUpdatePrivacyStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_PRIVACY_REQUEST),
);

/**
 * Social Networks status
 */
export const selectUpdateSocialStatus = createSelector(selectStatus, (status) =>
  status.get(UPDATE_SOCIAL_REQUEST),
);

/**
 * React Grid Layout status for profile
 */
export const selectSetLayoutStatus = createSelector(selectStatus, (status) =>
  status.get(SET_CURRENT_PROFILE_LAYOUT_REQUEST),
);

export const selectGetLayoutStatus = createSelector(selectStatus, (status) =>
  status.get(GET_PROFILE_LAYOUT_REQUEST),
);

/**
 * Games status
 */
export const selectCreateGameStatus = createSelector(selectStatus, (status) =>
  status.get(CREATE_USER_GAME_REQUEST),
);

export const selectUpdateGameStatus = createSelector(selectStatus, (status) =>
  status.get(UPDATE_USER_GAME_REQUEST),
);

export const selectDeleteGameStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_USER_GAME_REQUEST),
);

/**
 * Currently playing status
 */
export const selectUpdateCurrentlyPlayingStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_CURRENTLY_PLAYING_GAME_REQUEST),
);

export const selectDeleteCurrentlyPlayingStatus = createSelector(
  selectStatus,
  (status) => status.get(DELETE_CURRENTLY_PLAYING_GAME_REQUEST),
);
