import {
  UPLOAD_FILE_REQUEST,
  DELETE_FILE_REQUEST,
  UploadFileAction,
  DelteUploadedFileAction,
} from './types';
import { UploadRequest } from 'interfaces';

export default {
  // file
  uploadFile: (payload: UploadRequest): UploadFileAction => ({
    type: UPLOAD_FILE_REQUEST,
    payload,
  }),

  deleteFile: (file: string): DelteUploadedFileAction => ({
    type: DELETE_FILE_REQUEST,
    payload: file,
  }),
};
