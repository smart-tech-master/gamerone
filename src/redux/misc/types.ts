import { UploadRequest, Nullable } from 'interfaces';

/**
 * General
 */
export const START_REQUEST = 'misc/START_REQUEST';
export const FINISH_REQUEST = 'misc/FINISH_REQUEST';

export const UPLOAD_FILE_REQUEST = 'misc/UPLOAD_FILE_REQUEST';

export const DELETE_FILE_REQUEST = 'misc/DELETE_FILE_REQUEST';
export const DELETE_FILE_SUCCESS = 'misc/DELETE_FILE_SUCCESS';

export interface StartRequestAction {
  type: typeof START_REQUEST;
  payload: string;
}

interface FinishRequestAction {
  type: typeof FINISH_REQUEST;
  payload: FinishRequestPayload;
}

interface FinishRequestPayload {
  name: string;
  error: Nullable<Error>;
}

export interface UploadFileAction {
  type: typeof UPLOAD_FILE_REQUEST;
  payload: UploadRequest;
}

export interface DelteUploadedFileAction {
  type: typeof DELETE_FILE_REQUEST;
  payload: string;
}

export interface DeleteFileSuccessAction {
  type: typeof DELETE_FILE_SUCCESS;
  payload: string;
}

export type MiscState = {
  // todo
};

export type MiscActionTypes =
  | DelteUploadedFileAction
  | DeleteFileSuccessAction
  | UploadFileAction
  | StartRequestAction
  | FinishRequestAction;
