import { PostCommentRequest } from './../../interfaces/postCommentRequest';
import {
  ADD_POST_REQUEST,
  LOAD_FEED_REQUEST,
  GET_POSTS_REQUEST,
  ADD_COMMENT_REQUEST,
  LOAD_PAGE_REQUEST,
  LOAD_NEXT_PAGE,
  LOAD_INITIAL_PAGE,
  DOWN_VOTE_REQUEST,
  UP_VOTE_REQUEST,
  SHOW_COMMENTS,
  HIDE_COMMENTS,
  PAGE_DATA,
  AddPostAction,
  LoadFeedAction,
  GetPostsActions,
  UpVoteAction,
  DownVoteAction,
  AddCommentAction,
  ShowCommentsAction,
  LoadPageActionPayload,
  LoadNextPageAction,
  LoadInitialPageAction,
  HideCommentsAction,
  PageApiParam,
} from './types';
import { PostRequest, Post } from 'interfaces';

export default {
  // post
  addNewPost: (payload: PostRequest): AddPostAction => ({
    type: ADD_POST_REQUEST,
    payload,
  }),

  loadFeed: (): LoadFeedAction => ({
    type: LOAD_FEED_REQUEST,
  }),

  getPosts: (payload: number): GetPostsActions => ({
    type: GET_POSTS_REQUEST,
    payload,
  }),

  upVote: (payload: number): UpVoteAction => ({
    type: UP_VOTE_REQUEST,
    payload,
  }),

  downVote: (payload: number): DownVoteAction => ({
    type: DOWN_VOTE_REQUEST,
    payload,
  }),

  addComment: (id: number, request: PostCommentRequest): AddCommentAction => ({
    type: ADD_COMMENT_REQUEST,
    payload: {
      id,
      request,
    },
  }),

  // comments modal
  showComments: (payload: Post): ShowCommentsAction => ({
    type: SHOW_COMMENTS,
    payload,
  }),

  hideComments: (): HideCommentsAction => ({
    type: HIDE_COMMENTS,
  }),

  // pagination (comments, posts)
  loadPage: (payload: LoadPageActionPayload) => ({
    type: LOAD_PAGE_REQUEST,
    payload,
  }),

  loadNextPage: (key: PAGE_DATA, param: PageApiParam): LoadNextPageAction => ({
    type: LOAD_NEXT_PAGE,
    payload: {
      key,
      param,
    },
  }),

  loadInitialPage: (
    key: PAGE_DATA,
    param: PageApiParam,
  ): LoadInitialPageAction => ({
    type: LOAD_INITIAL_PAGE,
    payload: {
      key,
      param,
    },
  }),
};
