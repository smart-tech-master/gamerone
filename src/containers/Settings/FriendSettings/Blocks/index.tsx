import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';

import ProfileActions from 'redux/profile/actions';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

import SettingsActions from 'redux/settings/actions';
import {
  SettingsActionTypes,
  PAGE_BLOCKS,
  LOAD_PAGE_REQUEST,
} from 'redux/settings/types';
import { RootState } from 'redux/types';
import {
  selectSettingsBlocks,
  selectIsLastBlocks,
} from 'redux/settings/selectors';
import { selectStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';
import PageLoading from 'components/common/PageLoading';
import ListItemProfile from 'components/common/ListItem';
import { AVATAR_PLACEHOLDER } from 'utils/constants';

function BlocksSettings({
  blocks,
  isLastPage,
  status,
  dispatchLoadNextBlocks,
  dispatchLoadInitBlocks,
}: ConnectedProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUnblockClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    e.preventDefault();
    dispatch(ProfileActions.unblock(userId));
  };

  // load followers on first mount
  useEffect(() => {
    dispatchLoadInitBlocks();
    return () => {
      // clean up
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BlocksList = blocks.map((u) => {
    const fullName = (u.firstName || '') + ' ' + (u.lastName || '');
    return (
      <ListItemProfile
        key={u.id}
        title={u.username}
        description={fullName}
        image={u.avatar ? u.avatar : AVATAR_PLACEHOLDER}
        onClick={() => {
          history.push('/' + u.username);
        }}
        appendRight={
          <Button
            type="button"
            scheme={ButtonSchemeEnum.SUBTLE}
            onClick={(e) => handleUnblockClick(e, u.id)}
          >
            Unfollow
          </Button>
        }
      />
    );
  });

  const displayError = (
    <div role="alert">Error: {status?.error && status?.error.message}</div>
  );

  return (
    <Card>
      <div className="card__content">
        <h4>Blocked</h4>
        {status?.isFetching && <PageLoading show={true} />}
        {!status?.isFetching && status?.error && displayError}
        {!status?.isFetching && blocks.length === 0 ? (
          <div role="alert">You have not blocked anyone.</div>
        ) : (
          <>{BlocksList}</>
        )}
      </div>
      {!status?.isFetching && blocks.length > 0 && !isLastPage && (
        <div className="card__actions">
          <Button
            submitting={status?.isFetching}
            onClick={() => dispatchLoadNextBlocks()}
          >
            Load more
          </Button>
        </div>
      )}
    </Card>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    blocks: selectSettingsBlocks(state),
    isLastPage: selectIsLastBlocks(state),
    status: selectStatus(state).get(LOAD_PAGE_REQUEST + '/blocks'),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<SettingsActionTypes>) {
  return {
    dispatchLoadNextBlocks: () =>
      dispatch(SettingsActions.loadNextPage(PAGE_BLOCKS)),
    dispatchLoadInitBlocks: () =>
      dispatch(SettingsActions.loadInitialPage(PAGE_BLOCKS)),
  };
}

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(BlocksSettings);
