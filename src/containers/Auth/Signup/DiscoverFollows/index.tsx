import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import SearchProfile from 'containers/Search/SearchProfile';
import { RootState } from 'redux/types';
import { selectMultiFollowStatus } from 'redux/request-status/selectors';
import ProfileActions from 'redux/profile/actions';
import { selectCurrentUserId } from 'redux/auth/selectors';

import './style.scss';
import Card from 'components/common/Card';

interface DiscoverFollowsProps {
  followLimit?: number;
}
function DiscoverFollows({
  status,
  userId,
  followLimit = 11,
  dispatchMultiFollow,
}: DiscoverFollowsProps & MappedProps) {
  const [userIds, setUserIds] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleFinish = () => {
    if (followLimit && userIds.length > followLimit) return;

    const ids = Array.from(new Set(userIds));
    dispatchMultiFollow({
      userIds: ids,
    });
  };

  const handleProfileAdded = useCallback(
    (id: number) => {
      if (!followLimit || userIds.length < followLimit)
        setUserIds([...userIds, id]);
      else if (followLimit && userIds.length >= followLimit) {
        setMessage(`You can follow up to ${followLimit} users for now`);
      }
    },
    [userIds, followLimit],
  );

  const handleProfileRemoved = useCallback(
    (id: number) => {
      setUserIds(userIds.filter((userId) => userId !== id));
      if (message) {
        setMessage(null);
      }
    },
    [userIds, message],
  );

  const formFooter = (
    <div>
      {status?.isError && (
        <div aria-label="error-message">{status?.error?.message}</div>
      )}
      {message && <div aria-label="message">{message}</div>}
      <div>
        <Button
          scheme={ButtonSchemeEnum.PRIMARY}
          onClick={handleFinish}
          submitting={status?.isFetching}
        >
          Finish
        </Button>
      </div>
    </div>
  );

  return (
    <Card>
      <div className="card__content">
        <h4>Discover and Follow</h4>
        <SearchProfile
          multiple
          navigate={false}
          clearInput={false}
          className="discover-block"
          onAdd={handleProfileAdded}
          onRemove={handleProfileRemoved}
          limit={followLimit}
          blockedIds={[userId]}
        />
      </div>
      <div className="card__actions">{formFooter}</div>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    status: selectMultiFollowStatus(state),
    userId: selectCurrentUserId(state),
  };
};

const mapDispatchToProps = {
  dispatchMultiFollow: ProfileActions.multiFollow,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverFollows);
