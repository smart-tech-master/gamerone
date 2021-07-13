import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import TimeAgo from 'timeago-react';

import ImageCarousel from 'components/common/ImageCarousel';
import CommentBox from 'components/common/CommentBox';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import WriteComment from '../WriteComment';

import { RootState } from 'redux/types';
import { selectStatus } from 'redux/request-status/selectors';

import PostActions from 'redux/post/actions';
import {
  selectPostComments,
  selectCommentsIsOpen,
  selectShowedPost,
  selectPostCommentsReachedLastPage,
} from 'redux/post/selectors';

import { Comment } from 'interfaces';
import './style.scss';
import IsAuthenticated from 'components/utility/IsAuthenticated';
import Button from 'components/common/Button';
import { PostActionTypes, LOAD_PAGE_REQUEST } from 'redux/post/types';
import InputLoading from 'components/common/Form/InputLoading';

function Comments({
  post,
  show = false,
  comments,
  status,
  isLastPage,
  dispatchHideComments,
  dispatchLoadNextComments,
}: MappedProps) {
  const { description, createdAt, title, games } = post;

  const gameNames = games.map((game) => (
    <a href={`/${game.name}`} key={game.id}>
      {game.name}
    </a>
  ));

  const CommentList = useMemo(
    () =>
      comments
        .slice()
        .reverse()
        .map((comment) => <CommentBox key={comment.id} data={comment} />),
    [comments],
  );

  const displayError = (
    <div role="alert">Error: {status?.error && status?.error.message}</div>
  );

  const onClose = useCallback(() => {
    dispatchHideComments();
  }, [dispatchHideComments]);

  const onNext = useCallback(() => {
    dispatchLoadNextComments(post.id);
  }, [dispatchLoadNextComments, post.id]);

  return (
    <ModalWrapper show={show} onBackdropClick={onClose}>
      <div className="modal-header">
        {status?.isFetching && <InputLoading show={true} />}
        {!status?.isFetching && status?.error && displayError}

        <ImageCarousel images={post.images} />
        <div className="post-content">
          <div className="title">
            {title}
            <div className="time">
              <TimeAgo datetime={createdAt} />
            </div>
          </div>
          <div className="description">{description}</div>
          <div className="games">{gameNames}</div>
        </div>
      </div>
      <div className="modal__content">
        <div className="comments-container">{CommentList}</div>
        <div>
          {!isLastPage && (
            <Button type="button" onClick={onNext}>
              Load more
            </Button>
          )}
        </div>
      </div>
      <div className="modal__actions">
        <IsAuthenticated>
          {post.commentsEnabled ? (
            <WriteComment postId={post.id} />
          ) : (
            <span>Comments are disabled for this post</span>
          )}
        </IsAuthenticated>
      </div>
    </ModalWrapper>
  );
}

const mapStateToProps = (state: RootState) => ({
  post: selectShowedPost(state),
  show: selectCommentsIsOpen(state),
  comments: (selectPostComments(state) as Comment[]) || [],
  isLastPage: selectPostCommentsReachedLastPage(state),
  status: selectStatus(state).get(LOAD_PAGE_REQUEST + '/comments'),
});

export function mapDispatchToProps(dispatch: Dispatch<PostActionTypes>) {
  return {
    dispatchHideComments: () => dispatch(PostActions.hideComments()),
    dispatchLoadNextComments: (postId: number) =>
      dispatch(PostActions.loadNextPage('comments', { postId })),
  };
}

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, React.memo)(Comments) as React.ElementType;
