/**
 * Here comes the combined selectors from different states
 */

import { createSelector } from 'reselect';

import { selectCurrentUser } from './auth/selectors';

import {
  selectCurrentProfileUser,
  selectCurrentProfileNetworks,
  selectCurrentProfileSponsors,
  selectCurrentProfileProducts,
} from './profile/selectors';

import {
  selectSettingsSponsors,
  selectSettingsProducts,
  selectSettingsProfileUser,
  selectProfileSocialNetworks,
} from './settings/selectors';

// determines whether the currently viewing profile is my profile or not
export const selectIsSelfProfile = createSelector(
  [selectCurrentProfileUser, selectCurrentUser],
  (profileUser, authUser) => authUser.id === profileUser?.id,
);

export const selectProfileUser = createSelector(
  [selectCurrentProfileUser, selectSettingsProfileUser],
  (profileUser, settingsUser) =>
    settingsUser.id === profileUser?.id ? settingsUser : profileUser,
);

// resolves social networks to be shown on Profile page
export const selectSocialNetworks = createSelector(
  [
    selectIsSelfProfile,
    selectProfileSocialNetworks,
    selectCurrentProfileNetworks,
  ],
  (isSelfProfile, settingsNetworks, profileNetworks) =>
    isSelfProfile ? settingsNetworks : profileNetworks,
);

// resolves sponsors to be shown on Profile page
export const selectSponsors = createSelector(
  [selectIsSelfProfile, selectSettingsSponsors, selectCurrentProfileSponsors],
  (isSelfProfile, settingsSponsors, profileSponsors) =>
    isSelfProfile ? settingsSponsors : profileSponsors,
);

// resolves products to be shown on Profile page
export const selectProducts = createSelector(
  [selectIsSelfProfile, selectSettingsProducts, selectCurrentProfileProducts],
  (isSelfProfile, settingsProducts, profileProducts) =>
    isSelfProfile ? settingsProducts : profileProducts,
);
