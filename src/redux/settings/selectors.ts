import { createSelector } from 'reselect';
import { initState } from './reducer';
import { RootState } from '../types';
import { User, UserGame, GamePlatform, UserExperience } from 'interfaces';
import { GamePlatformModel } from 'models/GamePlatformModel';

export const selectGlobal = (state: RootState) => state.Settings || initState;

const sortByOrdinal = (a: GamePlatform, b: GamePlatform) =>
  (a as GamePlatformModel).ordinal - (b as GamePlatformModel).ordinal;

/**
 * Pagination - followers, followings, blocks, games
 */
export const selectSettingsFollowers = createSelector(
  selectGlobal,
  (state) => state.pageData.followers as User[],
);

export const selectSettingsFollowings = createSelector(
  selectGlobal,
  (state) => state.pageData.followings as User[],
);

export const selectSettingsBlocks = createSelector(
  selectGlobal,
  (state) => state.pageData.blocks as User[],
);

export const selectGamePlatforms = createSelector(selectGlobal, (state) =>
  [...state.gamePlatforms].sort(sortByOrdinal),
);

export const selectSettingsGames = createSelector(
  selectGlobal,
  (state) => state.pageData.games as UserGame[],
);

const selectSettingsFollowersResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.followers,
);

const selectSettingsFollowingsResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.followings,
);

const selectSettingsBlocksResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.blocks,
);

export const selectIsLastFollowers = createSelector(
  selectSettingsFollowersResponse,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);

export const selectIsLastFollowings = createSelector(
  selectSettingsFollowingsResponse,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);

export const selectIsLastBlocks = createSelector(
  selectSettingsBlocksResponse,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);

/**
 * Privacy
 */
export const selectUserPrivacy = createSelector(
  selectGlobal,
  (state) => state.privacy,
);

/**
 * Profile
 */
export const selectSettingsProfile = createSelector(
  selectGlobal,
  (state) => state.profile,
);

export const selectSettingsProfileUser = createSelector(
  selectGlobal,
  (state) => state.profile.user,
);

export const selectSettingsSocialNetworks = createSelector(
  selectGlobal,
  (state) => state.socials,
);

export const selectSettingsExperience = createSelector(
  selectGlobal,
  (state) => state.experiences as UserExperience[],
);
export const selectSettingsSponsors = (state: RootState) =>
  state.Settings.profile.sponsors;

export const selectSettingsProducts = (state: RootState) =>
  state.Settings.profile.products;

export const selectProfileSocialNetworks = (state: RootState) =>
  state.Settings.profile.networks;

export const selectLayoutSettings = (state: RootState) =>
  state.Settings.profile.layout;

export const selectCurrentlyPlaying = (state: RootState) =>
  state.Settings.profile.currentlyPlaying;

export const selectSettingProfileType = (state: RootState) =>
  state.Settings.profile.type;
