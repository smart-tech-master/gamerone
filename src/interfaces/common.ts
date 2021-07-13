import { LoginResponse } from './loginResponse';

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export interface StatusResponse {
  status: string;
}

// TODO: Do not put this into common interfaces
export interface FollowStatus {
  followCount?: number;
  followerCount?: number;
  isFollowing?: boolean;
  isBlocking?: boolean;
}

export type SignupResponse = LoginResponse;

export type Nullable<T> = T | null;
