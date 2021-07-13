import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Button from 'components/common/Button';
import SettingsActions from 'redux/settings/actions';
import { SettingsActionTypes, LOAD_PAGE_REQUEST } from 'redux/settings/types';
import { RootState } from 'redux/types';
import {
  selectSettingsFollowers,
  selectIsLastFollowers,
} from 'redux/settings/selectors';
import { selectStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';
import { useHistory } from 'react-router-dom';
import PageLoading from 'components/common/PageLoading';
import ListItemProfile from 'components/common/ListItem';
import { AVATAR_PLACEHOLDER } from 'utils/constants';

function FollowersSettings({
  followers,
  isLastPage,
  status,
  dispatchLoadNextFollowers,
  dispatchLoadInitFollowers,
}: ConnectedProps) {
  const history = useHistory();
  // load followers on first mount
  useEffect(() => {
    dispatchLoadInitFollowers();
    return () => {
      // clean up
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FollowersList = followers.map((u) => {
    return (
      <ListItemProfile
        key={u.id}
        title={u.username}
        image={u.avatar ? u.avatar : AVATAR_PLACEHOLDER}
        onClick={() => {
          history.push('/' + u.username);
        }}
      />
    );
  });

  const displayError = (
    <div role="alert">Error: {status?.error && status?.error.message}</div>
  );

  return (
    <Card>
      <div className="card__content">
        <h4>Followers</h4>
        {status?.isFetching && <PageLoading show={true} />}
        {!status?.isFetching && status?.error && displayError}
        {!status?.isFetching && followers.length === 0 ? (
          <div role="alert">You don&apos;t have any followers.</div>
        ) : (
          <>{FollowersList}</>
        )}
      </div>
      {!status?.isFetching && followers.length > 0 && !isLastPage && (
        <div className="card__actions">
          <Button
            submitting={status?.isFetching}
            onClick={() => dispatchLoadNextFollowers()}
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
    followers: selectSettingsFollowers(state),
    isLastPage: selectIsLastFollowers(state),
    status: selectStatus(state).get(LOAD_PAGE_REQUEST + '/followers'),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<SettingsActionTypes>) {
  return {
    dispatchLoadNextFollowers: () =>
      dispatch(SettingsActions.loadNextPage('followers')),
    dispatchLoadInitFollowers: () =>
      dispatch(SettingsActions.loadInitialPage('followers')),
  };
}

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FollowersSettings);
