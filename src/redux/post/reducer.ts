import produce from 'immer';

import {
  ADD_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  LOAD_FEED_SUCCESS,
  UP_VOTE_SUCCESS,
  DOWN_VOTE_SUCCESS,
  // GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  SHOW_COMMENTS,
  HIDE_COMMENTS,
  LOAD_PAGE_SUCCESS,
  PostState,
  PostActionTypes,
} from './types';

import { PostModel } from 'models/post';
import { INIT_STATE } from 'redux/types';

export const initState: PostState = {
  posts: [],
  feed: [],

  pageData: {
    comments: {},
    posts: {},
  },

  pageResponse: {
    comments: {},
    posts: {},
  },

  commentsIsOpen: false,
  showedPost: new PostModel(),
};

export default function miscReducer(
  state = initState,
  action: PostActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        Object.assign(draft, initState);
        break;

      case ADD_POST_SUCCESS:
        draft.feed.unshift(new PostModel().fromDto(action.payload));
        break;

      case LOAD_FEED_SUCCESS:
        draft.feed = action.payload.map((post) =>
          new PostModel().fromDto(post),
        );
        break;

      case GET_POSTS_SUCCESS:
        draft.posts = action.payload.map((post) =>
          new PostModel().fromDto(post),
        );
        break;

      case LOAD_PAGE_SUCCESS:
        const { key, response, param } = action.payload;
        const stringifiedParam = JSON.stringify(param);

        if (stringifiedParam in draft.pageData[key]) {
          draft.pageData[key][stringifiedParam].push(...response.data);
        } else {
          draft.pageData[key][stringifiedParam] = [...response.data];
        }

        draft.pageResponse[key][stringifiedParam] = response;
        break;

      case ADD_COMMENT_SUCCESS:
        {
          const { id, comment } = action.payload;
          const stringifiedParam = JSON.stringify({ postId: id });

          // update comments
          if (stringifiedParam in draft.pageData.comments) {
            draft.pageData.comments[stringifiedParam].push(comment);
          } else {
            draft.pageData.comments[stringifiedParam] = [comment];
          }

          // update feed
          draft.feed = state.feed.map((post) =>
            post.id === id
              ? { ...post, commentCount: post.commentCount + 1 }
              : post,
          );

          // update posts
          draft.posts = state.posts.map((post) =>
            post.id === id
              ? { ...post, commentCount: post.commentCount + 1 }
              : post,
          );
        }
        break;

      case UP_VOTE_SUCCESS:
      case DOWN_VOTE_SUCCESS:
        {
          // update feed
          let postIdx = draft.feed.findIndex(
            (post) => post.id === action.payload.id,
          );
          if (postIdx >= 0) {
            draft.feed[postIdx] = new PostModel().fromDto(action.payload);
          }

          // update posts
          postIdx = draft.posts.findIndex(
            (post) => post.id === action.payload.id,
          );
          if (postIdx >= 0) {
            draft.posts[postIdx] = new PostModel().fromDto(action.payload);
          }
        }
        break;

      case SHOW_COMMENTS:
        draft.commentsIsOpen = true;
        draft.showedPost = action.payload;
        break;

      case HIDE_COMMENTS:
        draft.commentsIsOpen = false;
        break;

      default:
        break;
    }
  });
}
