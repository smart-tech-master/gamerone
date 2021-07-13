import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

import SettingsActions from 'redux/settings/actions';
import { SettingsActionTypes, LOAD_PAGE_REQUEST } from 'redux/settings/types';
import { RootState } from 'redux/types';
import {
  selectSettingsFollowings,
  selectIsLastFollowings,
} from 'redux/settings/selectors';
import { selectStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';
import { User } from 'interfaces';
import PageLoading from 'components/common/PageLoading';
import ListItemProfile from 'components/common/ListItem';
import ProfileActions from 'redux/profile/actions';
import { useHistory } from 'react-router-dom';
import { AVATAR_PLACEHOLDER } from 'utils/constants';

function FollowingSettings({
  followings,
  isLastPage,
  status,
  dispatchLoadNextFollowings,
  dispatchLoadInitFollowings,
}: ConnectedProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUnfollowClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    e.stopPropagation();
    dispatch(ProfileActions.unfollow(userId));
  };

  // load followers on first mount
  useEffect(() => {
    dispatchLoadInitFollowings();
    return () => {
      // clean up
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FollowingsList = followings.map((u: User) => {
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
            onClick={(e) => handleUnfollowClick(e, u.id)}
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
        <h4>Following</h4>
        {status?.isFetching && <PageLoading show={true} />}
        {!status?.isFetching && status?.error && displayError}
        {!status?.isFetching && followings.length === 0 ? (
          <div role="alert">You are not following anyone.</div>
        ) : (
          <>{FollowingsList}</>
        )}
      </div>
      {!status?.isFetching && followings.length > 0 && !isLastPage && (
        <div className="card__actions">
          <Button
            submitting={status?.isFetching}
            onClick={() => dispatchLoadNextFollowings()}
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
    followings: selectSettingsFollowings(state),
    isLastPage: selectIsLastFollowings(state),
    status: selectStatus(state).get(LOAD_PAGE_REQUEST + '/followings'),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<SettingsActionTypes>) {
  return {
    dispatchLoadNextFollowings: () =>
      dispatch(SettingsActions.loadNextPage('followings')),
    dispatchLoadInitFollowings: () =>
      dispatch(SettingsActions.loadInitialPage('followings')),
  };
}

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FollowingSettings);
