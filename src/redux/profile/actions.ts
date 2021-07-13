import {
  GET_PROFILE_REQUEST,
  SET_CURRENT_PROFILE,
  FOLLOW_REQUEST,
  BLOCK_REQUEST,
  UNBLOCK_REQUEST,
  UNFOLLOW_REQUEST,
  SET_RESOLVED_CONTENT,
  MULTI_FOLLOW_REQUEST,
  SET_CURRENT_PROFILE_LAYOUT_REQUEST,
  GET_PROFILE_LAYOUT_REQUEST,
  PROFILE_LAYOUT_PROCESS,
  LoadPageActionPayload,
  LOAD_PAGE_REQUEST,
  PAGE_DATA,
  LoadNextPageAction,
  LOAD_NEXT_PAGE,
  LoadInitialPageAction,
  LOAD_INITIAL_PAGE,
  UpdateUserGamesAction,
  UPDATE_USER_GAMES,
  ProfileLayoutProcessTypeEnum,
  PROFILE_LAYOUT_TEMP,
} from './types';

import {
  Route,
  Profile,
  Nullable,
  MultiFollowRequest,
  LayoutSettings,
  UserGame,
} from 'interfaces';

export default {
  getProfile: (userid: number) => ({
    type: GET_PROFILE_REQUEST,
    payload: userid,
  }),

  setCurrentProfile: (profile: Nullable<Profile>) => ({
    type: SET_CURRENT_PROFILE,
    payload: profile,
  }),

  // Profile layout
  getProfileLayout: () => ({
    type: GET_PROFILE_LAYOUT_REQUEST,
  }),

  setCurrentProfileLayout: (profileLayout: LayoutSettings) => ({
    type: SET_CURRENT_PROFILE_LAYOUT_REQUEST,
    payload: profileLayout,
  }),

  getProfileLayoutProcess: (
    profileLayoutProcess: ProfileLayoutProcessTypeEnum,
  ) => ({
    type: PROFILE_LAYOUT_PROCESS,
    payload: profileLayoutProcess,
  }),

  getProfileLayoutTemp: (payload: LayoutSettings) => ({
    type: PROFILE_LAYOUT_TEMP,
    payload,
  }),

  setResolvedContent: (content: Nullable<Route>) => ({
    type: SET_RESOLVED_CONTENT,
    payload: content,
  }),

  // follow & block
  follow: (userid?: number) => ({
    type: FOLLOW_REQUEST,
    payload: userid,
  }),
  unfollow: (userid?: number) => ({
    type: UNFOLLOW_REQUEST,
    payload: userid,
  }),
  unblock: (userid?: number) => ({
    type: UNBLOCK_REQUEST,
    payload: userid,
  }),
  block: (userid?: number) => ({
    type: BLOCK_REQUEST,
    payload: userid,
  }),

  multiFollow: (payload: MultiFollowRequest) => ({
    type: MULTI_FOLLOW_REQUEST,
    payload,
  }),

  // pagination
  loadPage: (payload: LoadPageActionPayload) => ({
    type: LOAD_PAGE_REQUEST,
    payload,
  }),
  loadNextPage: (payload: PAGE_DATA): LoadNextPageAction => ({
    type: LOAD_NEXT_PAGE,
    payload,
  }),
  loadInitialPage: (payload: PAGE_DATA): LoadInitialPageAction => ({
    type: LOAD_INITIAL_PAGE,
    payload,
  }),

  updateUserGames: (payload: UserGame[]): UpdateUserGamesAction => ({
    type: UPDATE_USER_GAMES,
    payload,
  }),
};
