import {
  call,
  all,
  takeEvery,
  takeLatest,
  put,
  fork,
  select,
} from 'redux-saga/effects';
import * as PostApi from 'api/post';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_FEED_REQUEST,
  LOAD_FEED_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  UP_VOTE_REQUEST,
  UP_VOTE_SUCCESS,
  DOWN_VOTE_REQUEST,
  DOWN_VOTE_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LOAD_PAGE_REQUEST,
  LOAD_PAGE_SUCCESS,
  LOAD_NEXT_PAGE,
  LOAD_INITIAL_PAGE,
  SHOW_COMMENTS,
  AddPostAction,
  GetPostsActions,
  AddCommentAction,
  DownVoteAction,
  UpVoteAction,
  ShowCommentsAction,
  LoadPageAction,
  LoadNextPageAction,
  LoadPageActionPayload,
  LoadInitialPageAction,
  LoadPageSuccessActionPayload,
} from './types';
import RequestStatusActions from 'redux/request-status/actions';
import PostFormActions from 'redux/post-form/actions';
import PostActions from './actions';
import { selectShowedPostId } from './selectors';
import { PagedResponse } from 'interfaces';
import { RootState } from 'redux/types';

const PageApi = {
  comments: PostApi.getPostComments,
};

/**
 * Add new post
 */
export function* addPostRequest() {
  yield takeLatest(ADD_POST_REQUEST, function* ({ payload }: AddPostAction) {
    yield put(RequestStatusActions.startRequest(ADD_POST_REQUEST));
    yield put(PostFormActions.setForm(payload));

    try {
      const newPost = yield call(PostApi.addNewPost, payload);
      yield put({
        type: ADD_POST_SUCCESS,
        payload: newPost,
      });
      yield put(RequestStatusActions.finishRequest(ADD_POST_REQUEST));
    } catch (err) {
      console.log('add new post error', err);
      yield put(RequestStatusActions.finishRequest(ADD_POST_REQUEST, err));
    }
  });
}

export function* addPostSuccess() {
  yield takeLatest(ADD_POST_SUCCESS, function* () {
    yield put(PostFormActions.initForm());
  });
}

/**
 * Load my feeds
 */
export function* loadFeedRequest() {
  yield takeLatest(LOAD_FEED_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(LOAD_FEED_REQUEST));

    try {
      const feeds = yield call(PostApi.loadFeed);
      yield put({
        type: LOAD_FEED_SUCCESS,
        payload: feeds,
      });
      yield put(RequestStatusActions.finishRequest(LOAD_FEED_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(LOAD_FEED_REQUEST, err));
    }
  });
}

/**
 * Get profile posts
 */
export function* getPostsRequest() {
  yield takeLatest(GET_POSTS_REQUEST, function* ({ payload }: GetPostsActions) {
    yield put(RequestStatusActions.startRequest(GET_POSTS_REQUEST));

    try {
      const feeds = yield call(PostApi.getPosts, { userId: payload });
      yield put({
        type: GET_POSTS_SUCCESS,
        payload: feeds,
      });
      yield put(RequestStatusActions.finishRequest(GET_POSTS_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(GET_POSTS_REQUEST, err));
    }
  });
}

/**
 * Vote
 */
export function* upVoteRequest() {
  yield takeLatest(UP_VOTE_REQUEST, function* ({ payload }: UpVoteAction) {
    yield put(RequestStatusActions.startRequest(UP_VOTE_REQUEST));

    try {
      const response = yield call(PostApi.upVotePost, payload);
      yield put({
        type: UP_VOTE_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(UP_VOTE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UP_VOTE_REQUEST, err));
    }
  });
}

export function* downVoteRequest() {
  yield takeLatest(DOWN_VOTE_REQUEST, function* ({ payload }: DownVoteAction) {
    yield put(RequestStatusActions.startRequest(DOWN_VOTE_REQUEST));

    try {
      const response = yield call(PostApi.downVotePost, payload);
      yield put({
        type: DOWN_VOTE_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(DOWN_VOTE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DOWN_VOTE_REQUEST, err));
    }
  });
}

/**
 * Pagination
 */
export function* loadPageRequest() {
  yield takeEvery(LOAD_PAGE_REQUEST, function* ({ payload }: LoadPageAction) {
    const { key, page, param, dataApi } = payload;
    const REQUEST_NAME = LOAD_PAGE_REQUEST + '/' + key;

    yield put(RequestStatusActions.startRequest(REQUEST_NAME));

    try {
      const response = yield call<typeof dataApi>(dataApi, param, page);
      yield put({
        type: LOAD_PAGE_SUCCESS,
        payload: {
          key,
          response,
          param,
        } as LoadPageSuccessActionPayload,
      });

      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, null));
    } catch (err) {
      console.log('loadPageRequest', err);
      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, err));
    }
  });
}

export function* loadInitialPage() {
  yield takeEvery(LOAD_INITIAL_PAGE, function* ({
    payload,
  }: LoadInitialPageAction) {
    const { key, param } = payload;
    const currentResponse = yield select(
      ({ Post }: RootState) => Post.pageResponse[key][JSON.stringify(param)],
    );

    if (currentResponse === undefined) {
      yield put({
        type: LOAD_NEXT_PAGE,
        payload,
      });
    }
  });
}

export function* loadNextPage() {
  yield takeEvery(LOAD_NEXT_PAGE, function* ({ payload }: LoadNextPageAction) {
    const { key, param } = payload;
    const currentResponse = (yield select(
      ({ Post }: RootState) => Post.pageResponse[key][JSON.stringify(param)],
    )) as PagedResponse | undefined;

    const requestPayload = {
      key,
      param,
      page: currentResponse ? currentResponse.currentPage + 1 : 0,
      dataApi: PageApi[key],
    } as LoadPageActionPayload;

    if (!currentResponse || requestPayload.page <= currentResponse.lastPage)
      yield put({
        type: LOAD_PAGE_REQUEST,
        payload: requestPayload,
      });
    else {
      // Reached page end
    }
  });
}

/*
 * Comments
 */
export function* showComments() {
  yield takeLatest(SHOW_COMMENTS, function* ({ payload }: ShowCommentsAction) {
    const curPostId = yield select(selectShowedPostId);

    console.log('curPostId', curPostId);
    yield put(
      PostActions.loadInitialPage('comments', {
        postId: payload.id,
      }),
    );
  });
}

export function* addCommentRequest() {
  yield takeLatest(ADD_COMMENT_REQUEST, function* ({
    payload,
  }: AddCommentAction) {
    yield put(RequestStatusActions.startRequest(ADD_COMMENT_REQUEST));

    const { id, request } = payload;
    try {
      const response = yield call(PostApi.addComment, id, request);
      yield put({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          id,
          comment: response,
        },
      });
      yield put(RequestStatusActions.finishRequest(ADD_COMMENT_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_COMMENT_REQUEST, err));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(addPostRequest),
    fork(addPostSuccess),

    fork(loadFeedRequest),

    fork(getPostsRequest),

    fork(upVoteRequest),
    fork(downVoteRequest),

    fork(addCommentRequest),

    fork(showComments),

    fork(loadPageRequest),
    fork(loadNextPage),
    fork(loadInitialPage),
  ]);
}
