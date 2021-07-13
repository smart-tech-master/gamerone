import produce from 'immer';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  SET_CURRENT_PROFILE,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  SET_RESOLVED_CONTENT,
  ProfileActionTypes,
  ProfileState,
  GET_PROFILE_LAYOUT_SUCCESS,
  PROFILE_LAYOUT_PROCESS,
  LOAD_PAGE_SUCCESS,
  UPDATE_USER_GAMES,
  ProfileLayoutProcessTypeEnum,
  PROFILE_LAYOUT_TEMP,
} from './types';
import { ProfileModel } from 'models/profile';
import { RouteModel } from 'models/route';
// import { LayoutSettingsModel } from 'models/LayoutSettingModel';
import { INIT_STATE } from 'redux/types';

export const initState: ProfileState = {
  profiles: [],
  profile: null,
  resolvedContent: null,
  layout: { settings: null, visibility: null },
  layoutProcess: ProfileLayoutProcessTypeEnum.Initial,

  pageData: { games: [] },

  pageResponse: {
    games: null,
  },
};

export default function profileReducer(
  state = initState,
  action: ProfileActionTypes,
) {
  return produce<ProfileState>(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        Object.assign(draft, initState);
        break;

      case GET_PROFILE_SUCCESS: {
        // TODO: Implement dictionary based cache
        // draft.profiles.push(new ProfileModel().fromDto(action.payload));

        draft.profile = new ProfileModel().fromDto(action.payload);
        break;
      }

      case GET_PROFILE_ERROR:
        draft.profile = null;
        break;

      case SET_RESOLVED_CONTENT:
        draft.resolvedContent = new RouteModel().fromDto(action.payload);
        break;

      case SET_CURRENT_PROFILE:
        draft.profile = action.payload
          ? new ProfileModel().fromDto(action.payload)
          : null;
        break;

      case FOLLOW_SUCCESS:
        if (state.profile) {
          draft.profile = new ProfileModel().fromDto(state.profile.follow());
        }
        break;

      case UNFOLLOW_SUCCESS:
        if (state.profile) {
          draft.profile = new ProfileModel().fromDto(state.profile.unfollow());
        }
        break;

      case GET_PROFILE_LAYOUT_SUCCESS:
        if (state.profile) {
          draft.profile = new ProfileModel().fromDto(
            (state.profile as ProfileModel).updateLayoutSettings(
              action.payload,
            ),
          );
        }
        break;

      case PROFILE_LAYOUT_TEMP:
        draft.layout = action.payload;
        break;

      case PROFILE_LAYOUT_PROCESS:
        draft.layoutProcess = action.payload;
        break;

      // pagination
      case LOAD_PAGE_SUCCESS:
        const { key, response } = action.payload;
        draft.pageData[key] = response.data;
        draft.pageResponse[key] = response;
        break;

      // User Games
      case UPDATE_USER_GAMES:
        draft.pageData.games = action.payload;
        break;

      default:
        break;
    }
  });
}
