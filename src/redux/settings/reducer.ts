import produce from 'immer';
import {
  LOAD_PAGE_REQUEST,
  LOAD_PAGE_SUCCESS,
  REMOVE_BLOCKED,
  REMOVE_FOLLOWING,
  GET_EXPERIENCES_SUCCESS,
  GET_PRIVACY_SUCCESS,
  UPDATE_PRIVACY_SUCCESS,
  LOAD_PROFILE_SUCCESS,
  UPDATE_SPONSORS,
  UPDATE_PRODUCTS,
  UPDATE_SOCIALS,
  GET_SOCIALS,
  UPDATE_USER_GAMES,
  UPDATE_GAME_PLATFORMS,
  CURRENTLY_PLAYING_GAME,
  UPDATE_PROFILE_SUCCESS,
  SettingsState,
  SettingsActionTypes,
  UPDATE_EXPERIENCES,
  UPDATE_LAYOUT_SETTINGS,
} from './types';
import { NameVisibilityEnum, PostVisibilityEnum } from 'interfaces';
import { ProfileModel } from 'models/profile';
import { FOLLOW_SUCCESS, UNFOLLOW_SUCCESS } from 'redux/profile/types';
import { INIT_STATE } from 'redux/types';

export const initState: SettingsState = {
  profile: new ProfileModel(),
  privacy: {
    nameVisibility: NameVisibilityEnum.Public,
    postVisibility: PostVisibilityEnum.Public,
  },

  pageData: {
    followers: [],
    followings: [],
    blocks: [],
    games: [],
  },

  pageResponse: {
    followers: null,
    followings: null,
    blocks: null,
    games: null,
  },
  sponsors: [],
  experiences: [],
  socials: [],

  gamePlatforms: [],
};

export default function settingsReducer(
  state = initState,
  action: SettingsActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        Object.assign(draft, initState);
        break;

      // Profile
      case LOAD_PROFILE_SUCCESS:
        draft.profile = new ProfileModel().fromDto(action.payload);
        break;

      case UPDATE_PROFILE_SUCCESS:
        draft.profile = new ProfileModel().fromDto(
          (state.profile as ProfileModel).updateUser(action.payload),
        );
        break;

      // Pagination
      case LOAD_PAGE_REQUEST:
        break;

      case FOLLOW_SUCCESS:
        draft.profile = new ProfileModel().fromDto(
          (state.profile as ProfileModel).followed(),
        );
        break;

      case UNFOLLOW_SUCCESS:
        draft.profile = new ProfileModel().fromDto(
          (state.profile as ProfileModel).unfollowed(),
        );

        break;

      case LOAD_PAGE_SUCCESS:
        const { key, response } = action.payload;
        draft.pageData[key].push(...response.data);
        draft.pageResponse[key] = response;
        break;

      case GET_PRIVACY_SUCCESS:
      case UPDATE_PRIVACY_SUCCESS:
        draft.privacy = action.payload;
        break;

      // Unfollow, Unblock
      case REMOVE_FOLLOWING:
        draft.pageData.followings = draft.pageData.followings.filter(
          (u) => u.id !== action.payload,
        );
        break;

      case REMOVE_BLOCKED:
        draft.pageData.blocks = draft.pageData.blocks.filter(
          (u) => u.id !== action.payload,
        );
        break;

      case GET_EXPERIENCES_SUCCESS:
        draft.experiences = action.payload;
        break;

      case UPDATE_EXPERIENCES:
        draft.experiences = action.payload;
        break;

      // Sponosrs
      case UPDATE_SPONSORS:
        draft.profile.sponsors = action.payload;
        break;

      // Products
      case UPDATE_PRODUCTS:
        draft.profile.products = action.payload;
        break;

      // Social Networks for profile
      case UPDATE_SOCIALS:
        draft.profile.networks = action.payload;
        break;

      // Social Networks for settings
      case GET_SOCIALS:
        draft.socials = action.payload;
        draft.profile.networks = action.payload.filter((n) => n.value);
        break;

      // User Games
      case UPDATE_USER_GAMES:
        draft.pageData.games = action.payload;
        break;

      // GamePlatforms
      case UPDATE_GAME_PLATFORMS:
        draft.gamePlatforms = action.payload;
        break;

      // Currently Playing Game
      case CURRENTLY_PLAYING_GAME:
        draft.profile.currentlyPlaying = action.payload;
        break;

      // Layout Settings
      case UPDATE_LAYOUT_SETTINGS:
        draft.profile.layout = action.payload;
        break;

      default:
        break;
    }
  });
}
