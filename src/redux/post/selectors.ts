import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';
import { Post } from 'interfaces';
import { PostModel } from 'models/post';

export const selectGlobal = (state: RootState) => state.Post || initState;

const sortByTime = (a: Post, b: Post) =>
  (b as PostModel).createdDate.getTime() -
  (a as PostModel).createdDate.getTime();

export const selectSelfFeed = createSelector(
  selectGlobal,
  (state) => [...state.feed].sort(sortByTime) || [],
);

export const selectProfilePosts = createSelector(
  selectGlobal,
  (state) => [...state.posts].sort(sortByTime) || [],
);

export const selectComments = createSelector(
  selectGlobal,
  (state) => state.pageData.comments,
);

export const selectCommentsResponses = createSelector(
  selectGlobal,
  (state) => state.pageResponse.comments,
);

export const selectShowedPost = createSelector(
  selectGlobal,
  (state) => state.showedPost,
);

export const selectShowedPostId = createSelector(
  selectGlobal,
  (state) => state.showedPost.id,
);

export const selectCommentsIsOpen = createSelector(
  selectGlobal,
  (state) => state.commentsIsOpen,
);

export const selectPostComments = createSelector(
  [selectComments, selectShowedPostId],
  (comments, postId) => comments[JSON.stringify({ postId })],
);

export const selectPostCommentsResponse = createSelector(
  [selectCommentsResponses, selectShowedPostId],
  (responses, postId) => responses[JSON.stringify({ postId })],
);

export const selectPostCommentsReachedLastPage = createSelector(
  selectPostCommentsResponse,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);
