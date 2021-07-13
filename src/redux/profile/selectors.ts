import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';

const selectGlobal = (state: RootState) => state.Profile || initState;

export const selectProfiles = createSelector(
  selectGlobal,
  (state) => state.profiles || [],
);

/**
 * Profile
 */
export const selectCurrentProfile = createSelector(
  selectGlobal,
  (state) => state.profile,
);

export const selectResolvedContent = createSelector(
  selectGlobal,
  (state) => state.resolvedContent,
);

export const selectCurrentProfileUser = createSelector(
  [selectCurrentProfile, selectResolvedContent],
  (profile, route) => (profile ? profile.user : route?.content),
);

export const selectCurrentProfileId = createSelector(
  selectCurrentProfileUser,
  (user) => user?.id,
);

/**
 * Profile data
 */
export const selectCurrentProfileNetworks = createSelector(
  selectCurrentProfile,
  (profile) => profile?.networks,
);

export const selectCurrentProfileSponsors = createSelector(
  selectCurrentProfile,
  (profile) => profile?.sponsors,
);

export const selectCurrentProfileProducts = createSelector(
  selectCurrentProfile,
  (profile) => profile?.products,
);

/**
 * Layout
 */
export const selectCurrentProfileLayout = (state: RootState) =>
  state.Profile.profile?.layout;

export const selectProfileLayoutTemp = (state: RootState) =>
  state.Profile.layout;

export const selectProfileLayoutProcess = createSelector(
  selectGlobal,
  (state) => state.layoutProcess,
);

/**
 * Pagination - Games
 */
export const selectGames = createSelector(
  selectGlobal,
  (state) => state.pageData.games,
);

export const selectGamesResponses = createSelector(
  selectGlobal,
  (state) => state.pageResponse.games,
);
