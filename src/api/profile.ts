import request, { stringifyBody } from 'utils/request';
import {
  Profile,
  Route,
  User,
  ProfileSettingsRequest,
  SponsorRequest,
  ProductRequest,
  Nullable,
  UserExperienceAddRequest,
  UserExperience,
  Sponsor,
  Product,
  UserPrivacy,
  LayoutSettings,
  SocialNetwork,
  SocialNetworkUser,
  UserGamePagedResponse,
  GameAddRequest,
  UserGame,
  CurrentlyPlaying,
} from 'interfaces';
import {
  UpdateSponsorActionPayload,
  UpdateProductActionPayload,
  UpdateUserGameActionPayload,
} from 'redux/settings/types';
import { CurrentlyPlayingRequest } from 'interfaces/currentlyPlayingRequest';

const requestOptions = (param: any, method = 'POST') => ({
  method,
  body: stringifyBody(param),
});

export interface GetGamesParam {
  userId: number;
}

/**
 * Get profile information for given user id
 */
export const getProfile = (id: number) => {
  return request<Profile>(`/profile/get/${id}`);
};

/**
 * Get profile layout
 */
export const getProfileLayout = () => {
  return request<LayoutSettings>(`/profile/layout-settings`);
};

/**
 * Set profile layout
 */
export const setProfileLayout = (param: LayoutSettings) => {
  return request<LayoutSettings>(
    `/profile/layout-settings`,
    requestOptions(param, 'POST'),
  );
};

/**
 * Resolves the given slug to either user or club content
 */
export const resolveRoute = (param: string) => {
  return request<Route>(`/rr/${param}`);
};

/**
 * Search in the user database
 */
export const searchProfile = (q?: Nullable<string>) => {
  let url = '/profile/search';
  if (q) url += `?q=${q}`;

  return request<User[]>(url);
};

/**
 * Change profile informations and credentials
 */
export const updateProfile = (param: ProfileSettingsRequest) => {
  return request<User>('/profile/settings', requestOptions(param, 'PUT'));
};

/**
 * Upload a new avatar for your profile
 */
export const uploadAvatar = (f: File) => {
  const form = new FormData();
  form.append('f', f);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<User>('/profile/avatar', options);
};

/**
 * Upload a new banner for your profile
 */
export const uploadBanner = (f: File) => {
  const form = new FormData();
  form.append('f', f);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<User>('/profile/banner', options);
};

export const updateExperience = (
  id: number,
  data: UserExperienceAddRequest,
) => {
  return request<UserExperience[]>(
    '/profile/experiences/' + id,
    requestOptions(data, 'PUT'),
  );
};

/**
 * create experience data
 */
export const createExperience = (param: UserExperienceAddRequest) => {
  return request<UserExperience[]>(
    '/profile/experiences',
    requestOptions(param),
  );
};

/**
 * Delete a sponsor
 */
export const deleteExperience = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserExperience[]>('/profile/experiences/' + param, options);
};

/**
 * Get sponsors
 */
export const getExperiences = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserExperience[]>('/profile/experiences/', options);
};

/**
 * Create a sponsor
 */
export const createSponsor = (param: SponsorRequest) => {
  const file = new File([param.image], 'f.png', {
    type: param.image.type,
    lastModified: Date.now(),
  });

  const form = new FormData();
  form.append('name', param.name);
  form.append('link', param.link);
  form.append('image', file);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Sponsor>('/profile/sponsors', options);
};

/**
 * Update a sponsor
 */
export const updateSponsor = (param: UpdateSponsorActionPayload) => {
  const form = new FormData();
  form.append('name', param.data.name);
  form.append('link', param.data.link);
  if (param.data.image.type !== 'text/html') {
    const file = new File([param.data.image], 'f.png', {
      type: param.data.image.type,
      lastModified: Date.now(),
    });
    form.append('image', file);
  }

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Sponsor>(`/profile/sponsors/${param.id}`, options);
};

/**
 * Delete a sponsor
 */
export const deleteSponsor = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Sponsor>(`/profile/sponsors/${param}`, options);
};

/**
 * Get sponsors
 */
export const getSponsors = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Sponsor>('/profile/sponsors/', options);
};

/**
 * Create a product
 */
export const createProduct = (param: ProductRequest) => {
  const file = new File([param.image], 'f.png', {
    type: param.image.type,
    lastModified: Date.now(),
  });

  const form = new FormData();
  form.append('name', param.name);
  form.append('link', param.link);
  form.append('image', file);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Product>('/profile/store', options);
};

/**
 * Update a product
 */
export const updateProduct = (param: UpdateProductActionPayload) => {
  const form = new FormData();
  form.append('name', param.data.name);
  form.append('link', param.data.link);

  if (param.data.image.type !== 'text/html') {
    const file = new File([param.data.image], 'f.png', {
      type: param.data.image.type,
      lastModified: Date.now(),
    });
    form.append('image', file);
  }

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Product>(`/profile/store/${param.id}`, options);
};

/**
 * Delete a product
 */
export const deleteProduct = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Product>(`/profile/store/${param}`, options);
};

/**
 * Get stores
 */
export const getStores = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Product>('/profile/store/', options);
};

/**
 * Update a social
 */
export const updateSocial = (param: Array<SocialNetworkUser>) => {
  const data = { networks: param };

  return request<SocialNetwork>(
    '/social-networks',
    requestOptions(data, 'PUT'),
  );
};

/**
 * Delete a social
 */
export const deleteSocial = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<SocialNetwork>(`/social-networks/${param}`, options);
};

/**
 * Get socials
 */
export const getSocials = () => {
  return request<SocialNetwork>('/social-networks');
};

/*
 * Get current privacy settings
 */
export const getPrivacySettings = () => {
  return request<UserPrivacy>('/profile/privacy');
};

/**
 * Update current privacy settings
 */
export const updatePrivacySettings = (p: UserPrivacy) => {
  return request<UserPrivacy>('/profile/privacy', requestOptions(p, 'POST'));
};

/**
 * Get UserGames
 */
export const getUserGames = (param: number) => {
  return request<UserGamePagedResponse>(`/profile/get/${param}/games`);
};

/**
 * Add a UserGame
 */
export const createUserGame = (param: GameAddRequest) => {
  return request<UserGame>('/game/add/', requestOptions(param, 'POST'));
};

/**
 * Update a UserGame
 */
export const updateUserGame = (param: UpdateUserGameActionPayload) => {
  return request<UserGame>(
    `/game/update/${param.id}`,
    requestOptions(param.data, 'PUT'),
  );
};

/**
 * Delete a UserGame
 */
export const deleteUserGame = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserGame>(`/game/delete/${param}`, options);
};

/**
 * Get currently playing game
 */
export const getCurrentlyPlayingGame = (id: number) => {
  return request<CurrentlyPlaying>(`/game/current/${id}`);
};

/**
 * Update currently playing game
 */
export const updateCurrentlyPlayingGame = (param: CurrentlyPlayingRequest) => {
  return request<CurrentlyPlaying>(
    `/game/current`,
    requestOptions(param, 'PUT'),
  );
};

/**
 * Delete currently playing game
 */
export const deleteCurrentlyPlayingGame = () => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<CurrentlyPlaying>(`/game/current`, options);
};

/**
 * Get Online status
 */
export const getOnlineStatus = () => {
  return request<CurrentlyPlaying>(`/game/current/toggle-online`);
};
