import { PostCommentRequest } from 'interfaces/postCommentRequest';
import {
  PostRequest,
  Post,
  CommentPagedResponse,
  PagedResponse,
  Nullable,
} from 'interfaces';
import { Comment } from 'interfaces';
import { GetPostCommentsParam, GetPostsParam } from 'api/post';
import { RootStateActions } from 'redux/types';

/**
 * Posts
 */
export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';

export const LOAD_FEED_REQUEST = 'post/LOAD_FEED_REQUEST';
export const LOAD_FEED_SUCCESS = 'post/LOAD_FEED_SUCCESS';

export const GET_POSTS_REQUEST = 'post/GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS';

/**
 * Vote
 */
export const UP_VOTE_REQUEST = 'post/UP_VOTE_REQUEST';
export const UP_VOTE_SUCCESS = 'post/UP_VOTE_SUCCESS';

export const DOWN_VOTE_REQUEST = 'post/DOWN_VOTE_REQUEST';
export const DOWN_VOTE_SUCCESS = 'post/DOWN_VOTE_SUCCESS';

/*
 * Comments
 */
export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';

export const SHOW_COMMENTS = 'post/SHOW_COMMNETS';
export const HIDE_COMMENTS = 'post/HIDE_COMMENTS';

/**
 * Pagination
 */
export const LOAD_PAGE_REQUEST = 'post/LOAD_PAGE_REQUEST';
export const LOAD_PAGE_SUCCESS = 'post/LOAD_PAGE_SUCCESS';
export const LOAD_NEXT_PAGE = 'post/LOAD_NEXT_PAGE';
export const LOAD_INITIAL_PAGE = 'post/LOAD_INITIAL_PAGE';

export type PAGE_DATA = 'comments' | 'posts';
export type PageApiParam = GetPostCommentsParam | GetPostsParam;

/**
 * Actions
 */
export interface AddPostAction {
  type: typeof ADD_POST_REQUEST;
  payload: PostRequest;
}

export interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS;
  payload: Post;
}

export interface LoadFeedAction {
  type: typeof LOAD_FEED_REQUEST;
}

export interface LoadFeedSuccessAction {
  type: typeof LOAD_FEED_SUCCESS;
  payload: Post[];
}

export interface GetPostsActions {
  type: typeof GET_POSTS_REQUEST;
  payload: number;
}

export interface GetPostsSuccessAction {
  type: typeof GET_POSTS_SUCCESS;
  payload: Post[];
}

export interface UpVoteAction {
  type: typeof UP_VOTE_REQUEST;
  payload: number;
}

export interface DownVoteAction {
  type: typeof DOWN_VOTE_REQUEST;
  payload: number;
}

export interface UpVoteSuccessAction {
  type: typeof UP_VOTE_SUCCESS;
  payload: Post;
}

export interface DownVoteSuccessAction {
  type: typeof DOWN_VOTE_SUCCESS;
  payload: Post;
}

export interface AddCommentAction {
  type: typeof ADD_COMMENT_REQUEST;
  payload: AddCommentActionPayload;
}

export interface AddCommentActionPayload {
  id: number;
  request: PostCommentRequest;
}

export interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  payload: AddCommentSuccessActionPayload;
}

export interface AddCommentSuccessActionPayload {
  id: number;
  comment: Comment;
}

export interface ShowCommentsAction {
  type: typeof SHOW_COMMENTS;
  payload: Post;
}

export interface HideCommentsAction {
  type: typeof HIDE_COMMENTS;
}

// Pagination
export interface LoadPageAction {
  type: typeof LOAD_PAGE_REQUEST;
  payload: LoadPageActionPayload;
}

export interface LoadPageActionPayload {
  key: PAGE_DATA;
  page: number;
  param: PageApiParam;
  dataApi: (param: PageApiParam, p?: number) => Promise<any>;
}

export interface LoadNextPageAction {
  type: typeof LOAD_NEXT_PAGE;
  payload: LoadNextPageActionPayload;
}

export interface LoadInitialPageAction {
  type: typeof LOAD_INITIAL_PAGE;
  payload: LoadNextPageActionPayload;
}

export interface LoadNextPageActionPayload {
  key: PAGE_DATA;
  param: PageApiParam;
}

export interface LoadPageSuccessAction {
  type: typeof LOAD_PAGE_SUCCESS;
  payload: LoadPageSuccessActionPayload;
}

export interface LoadPageSuccessActionPayload {
  key: PAGE_DATA;
  param: PageApiParam;
  response: CommentPagedResponse; // TODO: Add more paged response here, e.g. posts
}

export interface PostState {
  feed: Post[]; // my feed
  posts: Post[]; // other profile's posts

  pageData: {
    [key in PAGE_DATA]: { [param: string]: Array<Comment | Post> };
  };

  pageResponse: {
    [key in PAGE_DATA]: { [param: string]: Nullable<PagedResponse> };
  };

  /* Describes comments modal show/hide status */
  commentsIsOpen: boolean;

  /* The lastly showed comments modal's post id */
  showedPost: Post;
}

export type PostActionTypes =
  // inherited actions
  | RootStateActions
  // post actions
  | AddPostAction
  | AddPostSuccessAction
  | LoadFeedAction
  | LoadFeedSuccessAction
  | GetPostsActions
  | GetPostsSuccessAction
  | UpVoteAction
  | DownVoteAction
  | UpVoteSuccessAction
  | DownVoteSuccessAction
  | AddCommentAction
  | AddCommentSuccessAction
  | ShowCommentsAction
  | HideCommentsAction
  | LoadPageSuccessAction
  | LoadNextPageAction;
