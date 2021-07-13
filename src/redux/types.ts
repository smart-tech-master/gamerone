import { AuthState } from './auth/types';
import { ProfileState } from './profile/types';
import { SettingsState } from './settings/types';
import { PostState } from './post/types';
import { PostFormState } from './post-form/types';
import { RequestStatusState } from './request-status/types';
import { RouterState } from 'connected-react-router';

export const INIT_STATE = 'root/INIT_STATE';
export const LOAD_STATE = 'root/LOAD_STATE';

export interface InitStateAction {
  type: typeof INIT_STATE;
}

export type RootStateActions = InitStateAction;

export interface RootState {
  Auth: AuthState;
  Profile: ProfileState;
  Settings: SettingsState;
  Post: PostState;
  PostForm: PostFormState;
  RequestStatus: RequestStatusState;
  router: RouterState;
}
