import React, { memo, useContext } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { selectCurrentProfileUser } from 'redux/profile/selectors';
import ProfileActions from 'redux/profile/actions';
import { AuthContext } from 'provider/auth';
import { RootState } from 'redux/types';
import { UserModel } from 'models/user';
import Dropdown, { DropdownOptionType } from 'components/common/Dropdown';

export interface FollowBlockProps {
  isSelf: boolean;
  className?: string;
}

function FollowBlock({
  isSelf,
  user,
  dispatchFollow,
  dispatchUnfollow,
  dispatchBlock,
}: FollowBlockProps & ConnectedProps) {
  const { isAuthenticated } = useContext(AuthContext);
  let { isFollowing } = (user as UserModel).followStatus;
  const { isBlocking = false } = (user as UserModel).followStatus;

  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFollowing) {
      dispatchFollow();
      isFollowing = true;
    }
  };

  const handleUnfollowClick = () => {
    if (isFollowing) dispatchUnfollow();
  };

  const handleBlockClick = () => {
    dispatchBlock();
  };

  const dropdownOptions = (): DropdownOptionType[] => {
    const options: DropdownOptionType[] = [];

    if (isFollowing) {
      options.push({
        label: 'Unfollow',
        onClick: (): void => handleUnfollowClick(),
      });
    }
    options.push({ label: 'Invite to Squad' });
    options.push({ label: 'Block', onClick: (): void => handleBlockClick() });
    options.push({ label: 'Unblock' });

    return options;
  };

  return !isSelf ? (
    <>
      <Button
        type="button"
        scheme={!isFollowing ? ButtonSchemeEnum.PRIMARY : null}
        onClick={handleFollowClick}
        aria-label="follow-button"
        disabled={!isAuthenticated || isFollowing || isBlocking}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
      <div style={{ marginLeft: 'auto' }}>
        <Dropdown options={dropdownOptions()}>
          <Button
            type="button"
            scheme={ButtonSchemeEnum.SQUARE}
            disabled={!isAuthenticated}
          >
            ...
          </Button>
        </Dropdown>
      </div>
    </>
  ) : (
    <></>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    user: selectCurrentProfileUser(state),
  };
};

const mapDispatchToProps = {
  dispatchFollow: ProfileActions.follow,
  dispatchUnfollow: ProfileActions.unfollow,
  dispatchBlock: ProfileActions.block,
};

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FollowBlock) as React.ElementType;
