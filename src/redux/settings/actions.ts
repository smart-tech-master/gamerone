import {
  CREATE_EXPERIENCE_REQUEST,
  CREATE_SPONSOR_REQUEST,
  CreateExperienceAction,
  CreateSponsorAction,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_SPONSOR_REQUEST,
  DeleteExperienceAction,
  GET_EXPERIENCES_REQUEST,
  GET_PRIVACY_REQUEST,
  GetExperiencesAction,
  GetPrivacyAction,
  LOAD_INITIAL_PAGE,
  LOAD_NEXT_PAGE,
  LOAD_PAGE_REQUEST,
  UPDATE_SPONSOR_REQUEST,
  CREATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRIVACY_REQUEST,
  LOAD_PROFILE_REQUEST,
  UPDATE_SOCIAL_REQUEST,
  DELETE_SOCIAL_REQUEST,
  GET_SOCIAL_REQUEST,
  CREATE_USER_GAME_REQUEST,
  UPDATE_USER_GAMES,
  DELETE_USER_GAME_REQUEST,
  UPDATE_USER_GAME_REQUEST,
  GET_GAME_PLATFORMS_REQUEST,
  UPDATE_GAME_PLATFORMS,
  UPDATE_PROFILE_SUCCESS,
  LoadProfileAction,
  UploadAvatarAction,
  UploadBannerAction,
  UpdateProfileAction,
  LoadPageActionPayload,
  LoadNextPageAction,
  LoadInitialPageAction,
  PAGE_DATA,
  REMOVE_BLOCKED,
  REMOVE_FOLLOWING,
  RemoveBlockedAction,
  RemoveFollowingAction,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UpdateExperienceAction,
  UpdatePrivacyAction,
  UpdateSponsorAction,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_BANNER_REQUEST,
  DeleteSponsorAction,
  CreateProductAction,
  UpdateProductAction,
  DeleteProductAction,
  UpdateSocialAction,
  DeleteSocialAction,
  GetSocialAction,
  CreateUserGameAction,
  UpdateUserGamesAction,
  DeleteUserGameAction,
  UpdateUserGameAction,
  GetGamePlatformsAction,
  UpdateGamePlatformsAction,
  GetCurrentlyPlayingGameAction,
  GET_CURRENTLY_PLAYING_GAME_REQUEST,
  DeleteCurrentlyPlayingGameAction,
  DELETE_CURRENTLY_PLAYING_GAME_REQUEST,
  UpdateCurrentlyPlayingGameAction,
  UPDATE_CURRENTLY_PLAYING_GAME_REQUEST,
  GetOnlineStatusAction,
  GET_ONLINE_STATUS_REQUEST,
  UpdateProfileSuccessAction,
} from './types';
import {
  ProfileSettingsRequest,
  SponsorRequest,
  UserExperienceAddRequest,
  ProductRequest,
  UserPrivacy,
  SocialNetworkUser,
  GameAddRequest,
  UserGame,
  GameUpdateRequest,
  GamePlatform,
  User,
} from 'interfaces';
import { CurrentlyPlayingRequest } from 'interfaces/currentlyPlayingRequest';

export default {
  // profile
  loadProfile: (): LoadProfileAction => ({
    type: LOAD_PROFILE_REQUEST,
  }),

  updateProfile: (data: ProfileSettingsRequest): UpdateProfileAction => ({
    type: UPDATE_PROFILE_REQUEST,
    payload: data,
  }),

  updateProfileSuccess: (payload: User): UpdateProfileSuccessAction => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload,
  }),

  // avatar
  uploadAvatar: (file: File): UploadAvatarAction => ({
    type: UPLOAD_AVATAR_REQUEST,
    payload: file,
  }),

  // banner
  uploadBanner: (file: File): UploadBannerAction => ({
    type: UPLOAD_BANNER_REQUEST,
    payload: file,
  }),

  // followers, friends, blocks, games
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

  // unfollow, unblock
  removeBlocked: (payload: number): RemoveBlockedAction => ({
    type: REMOVE_BLOCKED,
    payload,
  }),
  removeFollowing: (payload: number): RemoveFollowingAction => ({
    type: REMOVE_FOLLOWING,
    payload,
  }),

  // sponsor
  createSponsor: (data: SponsorRequest): CreateSponsorAction => ({
    type: CREATE_SPONSOR_REQUEST,
    payload: data,
  }),

  updateSponsor: (data: SponsorRequest, id: number): UpdateSponsorAction => ({
    type: UPDATE_SPONSOR_REQUEST,
    payload: { data, id },
  }),

  deleteSponsor: (payload: number): DeleteSponsorAction => ({
    type: DELETE_SPONSOR_REQUEST,
    payload,
  }),

  // experiences
  createExperience: (
    data: UserExperienceAddRequest,
  ): CreateExperienceAction => ({
    type: CREATE_EXPERIENCE_REQUEST,
    payload: data,
  }),

  updateExperience: (
    data: UserExperienceAddRequest,
    id: number,
  ): UpdateExperienceAction => ({
    type: UPDATE_EXPERIENCE_REQUEST,
    payload: { data, id },
  }),

  deleteExperience: (payload: number): DeleteExperienceAction => ({
    type: DELETE_EXPERIENCE_REQUEST,
    payload,
  }),

  getExperiences: (): GetExperiencesAction => ({
    type: GET_EXPERIENCES_REQUEST,
  }),

  // products
  createProduct: (data: ProductRequest): CreateProductAction => ({
    type: CREATE_PRODUCT_REQUEST,
    payload: data,
  }),

  updateProduct: (data: ProductRequest, id: number): UpdateProductAction => ({
    type: UPDATE_PRODUCT_REQUEST,
    payload: { data, id },
  }),

  deleteProduct: (payload: number): DeleteProductAction => ({
    type: DELETE_PRODUCT_REQUEST,
    payload,
  }),

  // social networks
  updateSocial: (data: Array<SocialNetworkUser>): UpdateSocialAction => ({
    type: UPDATE_SOCIAL_REQUEST,
    payload: data,
  }),

  deleteSocial: (payload: number): DeleteSocialAction => ({
    type: DELETE_SOCIAL_REQUEST,
    payload,
  }),

  getSocial: (): GetSocialAction => ({
    type: GET_SOCIAL_REQUEST,
  }),

  getPrivacy: (): GetPrivacyAction => ({
    type: GET_PRIVACY_REQUEST,
  }),

  updatePrivacy: (payload: UserPrivacy): UpdatePrivacyAction => ({
    type: UPDATE_PRIVACY_REQUEST,
    payload,
  }),

  getGamePlatforms: (): GetGamePlatformsAction => ({
    type: GET_GAME_PLATFORMS_REQUEST,
  }),

  updateGamePlatforms: (
    payload: GamePlatform[],
  ): UpdateGamePlatformsAction => ({
    type: UPDATE_GAME_PLATFORMS,
    payload,
  }),

  createUserGame: (payload: GameAddRequest): CreateUserGameAction => ({
    type: CREATE_USER_GAME_REQUEST,
    payload,
  }),

  updateUserGame: (
    data: GameUpdateRequest,
    id: number,
  ): UpdateUserGameAction => ({
    type: UPDATE_USER_GAME_REQUEST,
    payload: { data, id },
  }),

  deleteUserGame: (payload: number): DeleteUserGameAction => ({
    type: DELETE_USER_GAME_REQUEST,
    payload,
  }),

  updateUserGames: (payload: UserGame[]): UpdateUserGamesAction => ({
    type: UPDATE_USER_GAMES,
    payload,
  }),

  getCurrentlyPlayingGame: (): GetCurrentlyPlayingGameAction => ({
    type: GET_CURRENTLY_PLAYING_GAME_REQUEST,
  }),

  updateCurrentlyPlayingGame: (
    payload: CurrentlyPlayingRequest,
  ): UpdateCurrentlyPlayingGameAction => ({
    type: UPDATE_CURRENTLY_PLAYING_GAME_REQUEST,
    payload,
  }),

  deleteCurrentlyPlayingGame: (): DeleteCurrentlyPlayingGameAction => ({
    type: DELETE_CURRENTLY_PLAYING_GAME_REQUEST,
  }),

  getOnlineStatus: (): GetOnlineStatusAction => ({
    type: GET_ONLINE_STATUS_REQUEST,
  }),
};
