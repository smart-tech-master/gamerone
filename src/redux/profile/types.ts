import {
  Route,
  Profile,
  Nullable,
  MultiFollowRequest,
  LayoutSettings,
  UserGame,
  PagedResponse,
  UserGamePagedResponse,
} from 'interfaces';
import { ProfileModel } from 'models/profile';
import { RootStateActions } from 'redux/types';

/**
 * Profile
 */
export const GET_PROFILE_REQUEST = 'profile/GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'profile/GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'profile/GET_PROFILE_ERROR';

export const SET_CURRENT_PROFILE = 'profile/SET_CURRENT_PROFILE';

/**
 * Profile Layout
 */
export const GET_PROFILE_LAYOUT_REQUEST = 'profile/GET_PROFILE_LAYOUT_REQUEST';
export const GET_PROFILE_LAYOUT_SUCCESS = 'profile/GET_PROFILE_LAYOUT_SUCCESS';
export const GET_PROFILE_LAYOUT_ERROR = 'profile/GET_PROFILE_LAYOUT_ERROR';

export const SET_CURRENT_PROFILE_LAYOUT_REQUEST =
  'profile/SET_CURRENT_PROFILE_LAYOUT_REQUEST';
export const SET_CURRENT_PROFILE_LAYOUT_SUCCESS =
  'profile/SET_CURRENT_PROFILE_LAYOUT_SUCCESS';
export const SET_CURRENT_PROFILE_LAYOUT_ERROR =
  'profile/SET_CURRENT_PROFILE_LAYOUT_ERROR';

export const PROFILE_LAYOUT_PROCESS = 'profile/PROFILE_LAYOUT_PROCESS';
export const PROFILE_LAYOUT_TEMP = 'profile/PROFILE_LAYOUT_TEMP';

export type ProfileLayoutProcessType =
  | 'isEdit'
  | 'save'
  | 'default'
  | 'cancel'
  | 'initial';

export enum ProfileLayoutProcessTypeEnum {
  Initial = 'initial',
  IsEdit = 'isEdit',
  Save = 'save',
  Default = 'default',
  Cancel = 'cancel',
}

/**
 * Resolve route
 */
export const RESOLVE_NAME_REQUEST = 'profile/RESOLVE_NAME_REQUEST';
export const RESOLVE_NAME_SUCCESS = 'profile/RESOLVE_NAME_SUCCESS';
export const RESOLVE_NAME_ERROR = 'profile/RESOLVE_NAME_ERROR';

export const SET_RESOLVED_CONTENT = 'profile/SET_RESOLVED_CONTENT';

/**
 * Pagination for games
 */
export const LOAD_PAGE_REQUEST = 'profile/LOAD_PAGE_REQUEST';
export const LOAD_PAGE_SUCCESS = 'profile/LOAD_PAGE_SUCCESS';
export const LOAD_NEXT_PAGE = 'profile/LOAD_NEXT_PAGE';
export const LOAD_INITIAL_PAGE = 'profile/LOAD_INITIAL_PAGE';

export const UPDATE_USER_GAMES = 'profile/UPDATE_USER_GAMES';

export const PAGE_GAMES = 'games';

export type PAGE_DATA = typeof PAGE_GAMES;

/**
 * Follow actions
 */
export const FOLLOW_REQUEST = 'profile/FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'profile/FOLLOW_SUCCESS';

export const UNFOLLOW_REQUEST = 'profile/UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'profile/UNFOLLOW_SUCCESS';

export const BLOCK_REQUEST = 'profile/BLOCK_REQUEST';
export const BLOCK_SUCCESS = 'profile/BLOCK_SUCCESS';

export const UNBLOCK_REQUEST = 'profile/UNBLOCK_REQUEST';
export const UNBLOCK_SUCCESS = 'profile/UNBLOCK_SUCCESS';

export const FOLLOW_ACTIONS_ERROR = 'profile/FOLLOW_ACTIONS_ERROR';

export const MULTI_FOLLOW_REQUEST = 'profile/MULTI_FOLLOW_REQUEST';
export const MULTI_FOLLOW_SUCCESS = 'profile/MULTI_FOLLOW_SUCCESS';

interface ResolveNameAction {
  type: typeof RESOLVE_NAME_REQUEST;
}

interface ResolveNameSuccessAction {
  type: typeof RESOLVE_NAME_SUCCESS;
}

interface ResolveNameErrorAction {
  type: typeof RESOLVE_NAME_ERROR;
}

export interface MultiFollowAction {
  type: typeof MULTI_FOLLOW_REQUEST;
  payload: MultiFollowRequest;
}

export interface FollowAction {
  type: typeof FOLLOW_REQUEST;
  payload?: number;
}

export interface FollowSuccessAction {
  type: typeof FOLLOW_SUCCESS;
}

export interface BlockAction {
  type: typeof BLOCK_REQUEST;
  payload?: number;
}

export interface UnfollowAction {
  type: typeof UNFOLLOW_REQUEST;
  payload?: number;
}

export interface UnfollowSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  payload: number;
}

export interface UnblockAction {
  type: typeof UNBLOCK_REQUEST;
  payload?: number;
}

export interface UnblockSuccessAction {
  type: typeof UNBLOCK_SUCCESS;
  payload: number;
}

export interface GetProfileAction {
  type: typeof GET_PROFILE_REQUEST;
  payload: number;
}

interface GetProfileSuccessAction {
  type: typeof GET_PROFILE_SUCCESS;
  payload: Profile;
}

interface GetProfileErrorAction {
  type: typeof GET_PROFILE_ERROR;
  payload: Error;
}

interface SetCurrentProfileAction {
  type: typeof SET_CURRENT_PROFILE;
  payload: Nullable<Profile>;
}

/**
 * Profile Layout Actions
 */

export interface GetProfileLayoutAction {
  type: typeof GET_PROFILE_LAYOUT_REQUEST;
}

export interface GetProfileLayoutSuccessAction {
  type: typeof GET_PROFILE_LAYOUT_SUCCESS;
  payload: LayoutSettings;
}

export interface GetProfileLayoutErrorAction {
  type: typeof GET_PROFILE_LAYOUT_ERROR;
  payload: Error;
}

export interface SetCurrentProfileLayoutAction {
  type: typeof SET_CURRENT_PROFILE_LAYOUT_REQUEST;
  payload: LayoutSettings;
}

export interface ProfileLayoutProcessAction {
  type: typeof PROFILE_LAYOUT_PROCESS;
  payload: ProfileLayoutProcessTypeEnum;
}

export interface ProfileLayoutTempAction {
  type: typeof PROFILE_LAYOUT_TEMP;
  payload: LayoutSettings;
}

export interface SetResolvedContentAction {
  type: typeof SET_RESOLVED_CONTENT;
  payload: Route;
}

// Pagination
export interface LoadPageAction {
  type: typeof LOAD_PAGE_REQUEST;
  payload: LoadPageActionPayload;
}

export interface LoadNextPageAction {
  type: typeof LOAD_NEXT_PAGE;
  payload: PAGE_DATA;
}

export interface LoadInitialPageAction {
  type: typeof LOAD_INITIAL_PAGE;
  payload: PAGE_DATA;
}

export interface LoadPageSuccessAction {
  type: typeof LOAD_PAGE_SUCCESS;
  payload: LoadPageSuccessActionPayload;
}

export interface LoadPageSuccessActionPayload {
  key: PAGE_DATA;
  response: UserGamePagedResponse;
}

export interface LoadPageActionPayload {
  key: PAGE_DATA;
  page: number;
  dataApi: (id?: number, p?: number) => Promise<any>;
}

export interface UpdateUserGamesAction {
  type: typeof UPDATE_USER_GAMES;
  payload: UserGame[];
}

export interface ProfileState {
  /* A list of cached profiles */
  profiles: ProfileModel[];

  /* Currently showing profile */
  profile: Nullable<ProfileModel>;

  /* Currently resolved route content */
  resolvedContent: Nullable<Route>;

  /* Profile layout */
  layout: LayoutSettings;

  layoutProcess: ProfileLayoutProcessTypeEnum;

  pageData: {
    [key in PAGE_DATA]: Array<UserGame>;
  };

  pageResponse: {
    [key in PAGE_DATA]: Nullable<PagedResponse>;
  };
}

export type ProfileActionTypes =
  // inherited actions
  | RootStateActions
  // profile actions
  | SetCurrentProfileAction
  | GetProfileAction
  | GetProfileSuccessAction
  | GetProfileErrorAction
  | SetCurrentProfileLayoutAction
  | GetProfileLayoutAction
  | GetProfileLayoutSuccessAction
  | GetProfileLayoutErrorAction
  | FollowAction
  | MultiFollowAction
  | FollowSuccessAction
  | UnfollowAction
  | UnfollowSuccessAction
  | BlockAction
  | UnblockAction
  | UnblockSuccessAction
  | ResolveNameAction
  | ResolveNameSuccessAction
  | ResolveNameErrorAction
  | SetResolvedContentAction
  | ProfileLayoutProcessAction
  | LoadPageSuccessAction
  | LoadNextPageAction
  | UpdateUserGamesAction
  | ProfileLayoutTempAction;
