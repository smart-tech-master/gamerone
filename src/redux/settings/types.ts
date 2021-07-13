import {
  ProfileSettingsRequest,
  SponsorRequest,
  ProductRequest,
  Nullable,
  Profile,
  User,
  UserExperienceAddRequest,
  UserExperience,
  Sponsor,
  Product,
  UserPrivacy,
  SocialNetwork,
  SocialNetworkUser,
  PagedResponse,
  UserGame,
  UserGamePagedResponse,
  GameAddRequest,
  GameUpdateRequest,
  GamePlatform,
  CurrentlyPlaying,
  LayoutSettings,
} from 'interfaces';
import { UserPagedResponse } from 'interfaces/userPagedResponse';
import { CurrentlyPlayingRequest } from 'interfaces/currentlyPlayingRequest';
import {
  FollowSuccessAction,
  UnfollowSuccessAction,
} from 'redux/profile/types';
import { RootStateActions } from 'redux/types';

/**
 * Profile
 */
export const UPDATE_PROFILE_REQUEST = 'settings/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'settings/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'settings/UPDATE_PROFILE_ERROR';

export const LOAD_PROFILE_REQUEST = 'settings/LOAD_PROFILE_REQUEST';
export const LOAD_PROFILE_SUCCESS = 'settings/LOAD_PROFILE_SUCCESS';
export const LOAD_PROFILE_ERROR = 'settings/LOAD_PROFILE_ERROR';

/**
 * Avatar
 */
export const UPLOAD_AVATAR_REQUEST = 'settings/UPLOAD_AVATAR_REQUEST';
export const UPLOAD_AVATAR_SUCCESS = 'settings/UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_ERROR = 'settings/UPLOAD_AVATAR_ERROR';

/**
 * BANNER
 */
export const UPLOAD_BANNER_REQUEST = 'settings/UPLOAD_BANNER_REQUEST';
export const UPLOAD_BANNER_SUCCESS = 'settings/UPLOAD_BANNER_SUCCESS';
export const UPLOAD_BANNER_ERROR = 'settings/UPLOAD_BANNER_ERROR';

/**
 * PRIVACY
 */

export const GET_PRIVACY_REQUEST = 'settings/GET_PRIVACY_REQUEST';
export const GET_PRIVACY_SUCCESS = 'settings/GET_PRIVACY_SUCCESS';

export const UPDATE_PRIVACY_REQUEST = 'settings/UPDATE_PRIVACY_REQUEST';
export const UPDATE_PRIVACY_SUCCESS = 'settings/UPDATE_PRIVACY_SUCCESS';

/**
 * Pagination
 */
export const LOAD_PAGE_REQUEST = 'settings/LOAD_PAGE_REQUEST';
export const LOAD_PAGE_SUCCESS = 'settings/LOAD_PAGE_SUCCESS';
export const LOAD_NEXT_PAGE = 'settings/LOAD_NEXT_PAGE';
export const LOAD_INITIAL_PAGE = 'settings/LOAD_INITIAL_PAGE';

/**
 * Pagination key
 */
export const PAGE_FOLLOWERS = 'followers';
export const PAGE_FOLLOWINGS = 'followings';
export const PAGE_BLOCKS = 'blocks';

export const PAGE_GAMES = 'games';

export type PAGE_DATA =
  | typeof PAGE_FOLLOWERS
  | typeof PAGE_FOLLOWINGS
  | typeof PAGE_BLOCKS
  | typeof PAGE_GAMES;

/**
 * Unfollow, Unblock
 */
export const REMOVE_FOLLOWING = 'settings/REMOVE_FOLLOWING';
export const REMOVE_BLOCKED = 'settings/REMOVE_BLOCKED';

/**
 * Experience
 */
export const UPDATE_EXPERIENCE_REQUEST = 'settings/UPDATE_EXPERIENCE_REQUEST';
export const UPDATE_EXPERIENCE_SUCCESS = 'settings/UPDATE_EXPERIENCE_SUCCESS';
export const UPDATE_EXPERIENCE_ERROR = 'settings/UPDATE_EXPERIENCE_ERROR';

export const DELETE_EXPERIENCE_REQUEST = 'settings/DELETE_EXPERIENCE_REQUEST';
export const DELETE_EXPERIENCES_SUCCESS = 'settings/DELETE_EXPERIENCES_SUCCESS';
export const DELETE_EXPERIENCES_ERROR = 'settings/DELETE_EXPERIENCES_ERROR';

export const GET_EXPERIENCES_REQUEST = 'settings/GET_EXPERIENCES_REQUEST';
export const GET_EXPERIENCES_SUCCESS = 'settings/GET_EXPERIENCES_SUCCESS';
export const GET_EXPERIENCES_ERROR = 'settings/GET_EXPERIENCES_ERROR';

export const CREATE_EXPERIENCE_REQUEST = 'settings/CREATE_EXPERIENCE_REQUEST';
export const CREATE_EXPERIENCE_SUCCESS = 'settings/CREATE_EXPERIENCE_SUCCESS';
export const CREATE_EXPERIENCE_ERROR = 'settings/CREATE_EXPERIENCE_ERROR';

export const UPDATE_EXPERIENCES = 'settings/UPDATE_EXPERIENCES';
export const GET_EXPERIENCES = 'settings/GET_EXPERIENCES';

/**
 * Sponsor
 */
export const CREATE_SPONSOR_REQUEST = 'settings/CREATE_SPONSOR_REQUEST';
export const CREATE_SPONSOR_SUCCESS = 'settings/CREATE_SPONSOR_SUCCESS';
export const CREATE_SPONSOR_ERROR = 'settings/CREATE_SPONSOR_ERROR';

export const UPDATE_SPONSOR_REQUEST = 'settings/UPDATE_SPONSOR_REQUEST';
export const UPDATE_SPONSOR_SUCCESS = 'settings/UPDATE_SPONSOR_SUCCESS';
export const UPDATE_SPONSOR_ERROR = 'settings/UPDATE_SPONSOR_ERROR';

export const DELETE_SPONSOR_REQUEST = 'settings/DELETE_SPONSOR_REQUEST';
export const DELETE_SPONSOR_SUCCESS = 'settings/DELETE_SPONSOR_SUCCESS';
export const DELETE_SPONSOR_ERROR = 'settings/DELETE_SPONSOR_ERROR';

export const UPDATE_SPONSORS = 'settings/UPDATE_SPONSORS';

/**
 * Products
 */
export const CREATE_PRODUCT_REQUEST = 'settings/CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'settings/CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'settings/CREATE_PRODUCT_ERROR';

export const UPDATE_PRODUCT_REQUEST = 'settings/UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'settings/UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = 'settings/UPDATE_PRODUCT_ERROR';

export const DELETE_PRODUCT_REQUEST = 'settings/DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'settings/DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'settings/DELETE_PRODUCT_ERROR';

export const UPDATE_PRODUCTS = 'settings/UPDATE_PRODUCTS';

/**
 * Social Network
 */
export const UPDATE_SOCIAL_REQUEST = 'settings/UPDATE_SOCIAL_REQUEST';
export const UPDATE_SOCIAL_SUCCESS = 'settings/UPDATE_SOCIAL_SUCCESS';
export const UPDATE_SOCIAL_ERROR = 'settings/UPDATE_SOCIAL_ERROR';

export const DELETE_SOCIAL_REQUEST = 'settings/DELETE_SOCIAL_REQUEST';
export const DELETE_SOCIAL_SUCCESS = 'settings/DELETE_SOCIAL_SUCCESS';
export const DELETE_SOCIAL_ERROR = 'settings/DELETE_SOCIAL_ERROR';

export const GET_SOCIAL_REQUEST = 'settings/GET_SOCIAL_REQUEST';
export const GET_SOCIAL_SUCCESS = 'settings/GET_SOCIAL_SUCCESS';
export const GET_SOCIAL_ERROR = 'settings/GET_SOCIAL_ERROR';

export const GET_SOCIALS = 'settings/GET_SOCIALS';
export const UPDATE_SOCIALS = 'settings/UPDATE_SOCIALS';

/**
 * Games
 */
export const GET_GAME_PLATFORMS_REQUEST = 'settings/GET_GAME_PLATFORMS_REQUEST';
export const UPDATE_GAME_PLATFORMS = 'settings/UPDATE_GAME_PLATFORMS';

export const CREATE_USER_GAME_REQUEST = 'settings/CREATE_USER_GAME_REQUEST';
export const CREATE_USER_GAME_SUCCESS = 'settings/CREATE_USER_GAME_SUCCESS';
export const CREATE_USER_GAME_ERROR = 'settings/CREATE_USER_GAME_ERROR';

export const UPDATE_USER_GAME_REQUEST = 'settings/UPDATE_USER_GAME_REQUEST';
export const UPDATE_USER_GAME_SUCCESS = 'settings/UPDATE_USER_GAME_SUCCESS';
export const UPDATE_USER_GAME_ERROR = 'settings/UPDATE_USER_GAME_ERROR';

export const DELETE_USER_GAME_REQUEST = 'settings/DELETE_USER_GAME_REQUEST';
export const DELETE_USER_GAME_SUCCESS = 'settings/DELETE_USER_GAME_SUCCESS';
export const DELETE_USER_GAME_ERROR = 'settings/DELETE_USER_GAME_ERROR';

export const UPDATE_USER_GAMES = 'settings/UPDATE_USER_GAMES';

/**
 * Currently playing on profile overview
 */
export const GET_CURRENTLY_PLAYING_GAME_REQUEST =
  'settings/GET_CURRENTLY_PLAYING_GAME_REQUEST';

export const UPDATE_CURRENTLY_PLAYING_GAME_REQUEST =
  'settings/UPDATE_CURRENTLY_PLAYING_GAME_REQUEST';

export const DELETE_CURRENTLY_PLAYING_GAME_REQUEST =
  'settings/DELETE_CURRENTLY_PLAYING_GAME_REQUEST';

export const GET_ONLINE_STATUS_REQUEST = 'settings/GET_ONLINE_STATUS_REQUEST';

export const CURRENTLY_PLAYING_GAME = 'settings/CURRENTLY_PLAYING_GAME';

/**
 * Profile overview layout settings
 */
export const UPDATE_LAYOUT_SETTINGS = 'settings/UPDATE_LAYOUT_SETTINGS';

/**
 * Actions
 */
export interface LoadProfileAction {
  type: typeof LOAD_PROFILE_REQUEST;
}

interface LoadProfileSuccessAction {
  type: typeof LOAD_PROFILE_SUCCESS;
  payload: Profile;
}

// Update Profile
export interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE_REQUEST;
  payload: ProfileSettingsRequest;
}

export interface UpdateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
  payload: User;
}

// Update Avatar, Banner
export interface UploadAvatarAction {
  type: typeof UPLOAD_AVATAR_REQUEST;
  payload: File;
}

export interface UploadBannerAction {
  type: typeof UPLOAD_BANNER_REQUEST;
  payload: File;
}

// Followers, Followings, Blocked pagination
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
  response: UserPagedResponse | UserGamePagedResponse;
}

export interface LoadPageActionPayload {
  key: PAGE_DATA;
  page: number;
  dataApi: (id?: number, p?: number) => Promise<any>;
}

export interface RemoveBlockedAction {
  type: typeof REMOVE_BLOCKED;
  payload: number;
}

export interface RemoveFollowingAction {
  type: typeof REMOVE_FOLLOWING;
  payload: number;
}

// Create a sponsor
export interface CreateSponsorAction {
  type: typeof CREATE_SPONSOR_REQUEST;
  payload: SponsorRequest;
}

// Update a sponsor
export interface UpdateSponsorActionPayload {
  id: number;
  data: SponsorRequest;
}

export interface UpdateSponsorAction {
  type: typeof UPDATE_SPONSOR_REQUEST;
  payload: UpdateSponsorActionPayload;
}

export interface UpdateSponsorsAction {
  type: typeof UPDATE_SPONSORS;
  payload: Sponsor[];
}

// Delete a sponsor
export interface DeleteSponsorAction {
  type: typeof DELETE_SPONSOR_REQUEST;
  payload: number;
}

/**
 * Product Actions
 */

// Create a product
export interface CreateProductAction {
  type: typeof CREATE_PRODUCT_REQUEST;
  payload: ProductRequest;
}

// Update a product
export interface UpdateProductActionPayload {
  id: number;
  data: ProductRequest;
}

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT_REQUEST;
  payload: UpdateProductActionPayload;
}

// Delete a product
export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT_REQUEST;
  payload: number;
}

/**
 * Social Network Actions
 */

// Update socials
export interface UpdateSocialAction {
  type: typeof UPDATE_SOCIAL_REQUEST;
  payload: Array<SocialNetworkUser>;
}

// Delete a social
export interface DeleteSocialAction {
  type: typeof DELETE_SOCIAL_REQUEST;
  payload: number;
}

// Get socials
export interface GetSocialAction {
  type: typeof GET_SOCIAL_REQUEST;
}

export interface GetPrivacyAction {
  type: typeof GET_PRIVACY_REQUEST;
}

export interface GetPrivacySuccessAction {
  type: typeof GET_PRIVACY_SUCCESS;
  payload: UserPrivacy;
}

export interface UpdatePrivacyAction {
  type: typeof UPDATE_PRIVACY_REQUEST;
  payload: UserPrivacy;
}

export interface UpdatePrivacySuccessAction {
  type: typeof UPDATE_PRIVACY_SUCCESS;
  payload: UserPrivacy;
}

// Delete Experience
export interface DeleteExperienceAction {
  type: typeof DELETE_EXPERIENCE_REQUEST;
  payload: number;
}

// Update Experience
export interface UpdateExperienceAction {
  type: typeof UPDATE_EXPERIENCE_REQUEST;
  payload: UpdateExperienceActionPayload;
}

export interface UpdateExperiencesAction {
  type: typeof UPDATE_EXPERIENCES;
  payload: UserExperience[];
}

// Get experiences
export interface GetExperiencesAction {
  type: typeof GET_EXPERIENCES_REQUEST;
}

export interface GetExperiencesSuccessAction {
  type: typeof GET_EXPERIENCES_SUCCESS;
  payload: UserExperience[];
}

// Create an experience
export interface CreateExperienceAction {
  type: typeof CREATE_EXPERIENCE_REQUEST;
  payload: UserExperienceAddRequest;
}

// Update n experience
export interface UpdateExperienceActionPayload {
  id: number;
  data: UserExperienceAddRequest;
}

export interface UpdateProductsAction {
  type: typeof UPDATE_PRODUCTS;
  payload: Product[];
}

export interface UpdateSocialsAction {
  type: typeof UPDATE_SOCIALS;
  payload: SocialNetwork[];
}

export interface GetSocialsAction {
  type: typeof GET_SOCIALS;
  payload: SocialNetwork[];
}

/**
 * Games
 */

// get game platforms
export interface GetGamePlatformsAction {
  type: typeof GET_GAME_PLATFORMS_REQUEST;
}

export interface UpdateGamePlatformsAction {
  type: typeof UPDATE_GAME_PLATFORMS;
  payload: GamePlatform[];
}

// create a usergame
export interface CreateUserGameAction {
  type: typeof CREATE_USER_GAME_REQUEST;
  payload: GameAddRequest;
}

// update a usergame
export interface UpdateUserGameActionPayload {
  id: number;
  data: GameUpdateRequest;
}

export interface UpdateUserGameAction {
  type: typeof UPDATE_USER_GAME_REQUEST;
  payload: UpdateUserGameActionPayload;
}

// delete a usergame
export interface DeleteUserGameAction {
  type: typeof DELETE_USER_GAME_REQUEST;
  payload: number;
}

export interface UpdateUserGamesAction {
  type: typeof UPDATE_USER_GAMES;
  payload: UserGame[];
}

/**
 * Currently playing game actions
 */

// get request
export interface GetCurrentlyPlayingGameAction {
  type: typeof GET_CURRENTLY_PLAYING_GAME_REQUEST;
}

// update request
export interface UpdateCurrentlyPlayingGameAction {
  type: typeof UPDATE_CURRENTLY_PLAYING_GAME_REQUEST;
  payload: CurrentlyPlayingRequest;
}

// delete request
export interface DeleteCurrentlyPlayingGameAction {
  type: typeof DELETE_CURRENTLY_PLAYING_GAME_REQUEST;
}

// online status
export interface GetOnlineStatusAction {
  type: typeof GET_ONLINE_STATUS_REQUEST;
}

// update currently playing game
export interface CurrentlyPlayingGameAction {
  type: typeof CURRENTLY_PLAYING_GAME;
  payload: CurrentlyPlaying;
}

export interface UpdateLayoutSettingsAction {
  type: typeof UPDATE_LAYOUT_SETTINGS;
  payload: LayoutSettings;
}

// State
export interface SettingsState {
  /* Sessioned user's profile */
  profile: Profile;

  /* User privacy */
  privacy: UserPrivacy;

  /* Followers, Followings, Blocks, Games data */
  pageData: {
    [key in PAGE_DATA]: Array<User | UserGame>;
  };

  /* Dictionary of page responses */
  pageResponse: {
    [key in PAGE_DATA]: Nullable<PagedResponse>;
  };

  /* Sponsors */
  sponsors: Sponsor[];

  /* Experiences */
  experiences: UserExperience[];
  socials: Array<SocialNetwork>;

  gamePlatforms: GamePlatform[];
}

export type SettingsActionTypes =
  // inherited actions
  | RootStateActions
  // settings actions
  | LoadProfileAction
  | LoadProfileSuccessAction
  | UpdateProfileAction
  | UpdateProfileSuccessAction
  | UploadAvatarAction
  | UploadBannerAction
  | LoadPageAction
  | LoadNextPageAction
  | LoadInitialPageAction
  | LoadPageSuccessAction
  | RemoveBlockedAction
  | RemoveFollowingAction
  | UpdateExperienceAction
  | DeleteExperienceAction
  | GetExperiencesAction
  | GetExperiencesSuccessAction
  | CreateExperienceAction
  | CreateSponsorAction
  | UpdateExperiencesAction
  | UpdateSponsorAction
  | DeleteSponsorAction
  | CreateProductAction
  | UpdateProductAction
  | DeleteProductAction
  | UpdateSocialAction
  | DeleteSocialAction
  | GetSocialAction
  | GetSocialsAction
  | GetPrivacyAction
  | GetPrivacySuccessAction
  | UpdatePrivacyAction
  | UpdatePrivacySuccessAction
  | UpdateSponsorsAction
  | UpdateProductsAction
  | UpdateSocialsAction
  | CreateUserGameAction
  | UpdateUserGameAction
  | DeleteUserGameAction
  | UpdateUserGamesAction
  | GetGamePlatformsAction
  | UpdateGamePlatformsAction
  | GetCurrentlyPlayingGameAction
  | UpdateCurrentlyPlayingGameAction
  | DeleteCurrentlyPlayingGameAction
  | GetOnlineStatusAction
  | CurrentlyPlayingGameAction
  // bind to profile actions
  | FollowSuccessAction
  | UnfollowSuccessAction
  | UpdateLayoutSettingsAction;
