import React, { useState, useCallback } from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import { User, UserType } from 'interfaces';
import { CDN_URL } from 'utils/constants';
import FollowStatusBlock from 'components/common/FollowStatus';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import FollowBlock from 'containers/Profile/FollowBlock';
import { UserModel } from 'models/user';
import './style.scss';
import UserSettingsTab from 'containers/Profile/UserSettingsTab';

export interface UserCardProps {
  user: User;
  userType?: UserType;
  isSelf: boolean;
  allowEditLayout?: boolean;
  isEditing?: boolean;
  onEdit?: (e?: any) => void;
  onSaveLayoutEdit?: (e?: any) => void;
  onDefault?: (e?: any) => void;
  onCancelEdit?: (e?: any) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  userType,
  isSelf = false,
  allowEditLayout = false,
  isEditing,
  onEdit,
  onSaveLayoutEdit,
  onDefault,
  onCancelEdit,
}: UserCardProps): JSX.Element => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const { avatar, firstName, lastName, username, birthDate, location } = user;
  const fullName = (firstName || '') + ' ' + (lastName || '');
  const { followCount, followerCount } = (user as UserModel).followStatus;
  // todo remove hard coded path
  const avatarSrc = CDN_URL + '/128x128/' + avatar;

  const handleClickEdit = useCallback(() => {
    setSettingsIsOpen(true);
  }, []);

  const handleCloseUserSettings = useCallback(() => {
    setSettingsIsOpen(false);
  }, []);

  return (
    <>
      <Card type={CardTypeEnum.USER} isOwner={isSelf} onEdit={handleClickEdit}>
        <div className="card__header">
          <div
            className="profile-picture"
            style={{
              background: `url(${avatarSrc})`,
            }}
          />
          <h1 className="username">
            <span className="at">@</span>
            {username}
            {userType ? (
              userType.id === 4 || userType.id === 5 ? (
                <span className="user-type-badge">PRO</span>
              ) : null
            ) : null}
          </h1>
          <h2 className="name">{fullName}</h2>
        </div>
        <div>
          <div className="status">
            <span className="icon">&ldquo;</span>
            {user.bio}
          </div>
        </div>
        <div
          className="card__content"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
        >
          <FollowStatusBlock
            followCount={followCount}
            followerCount={followerCount}
            location={location}
            birthDate={birthDate}
          />
        </div>
        <div className="card__actions">
          {!isSelf && <FollowBlock isSelf={isSelf} />}
          {isSelf && allowEditLayout && (
            <>
              {!isEditing && (
                <Button
                  type="button"
                  onClick={onEdit}
                  className="button--transparent"
                >
                  Edit layout
                </Button>
              )}
              {isEditing && (
                <>
                  <Button
                    type="button"
                    scheme={ButtonSchemeEnum.PRIMARY}
                    onClick={onSaveLayoutEdit}
                  >
                    Save
                  </Button>
                  <Button type="button" onClick={onDefault}>
                    Default
                  </Button>
                  <Button type="button" onClick={onCancelEdit}>
                    Cancel
                  </Button>
                </>
              )}
            </>
          )}
          <Button scheme={ButtonSchemeEnum.SQUARE} className="last">
            ...
          </Button>
        </div>
      </Card>

      <UserSettingsTab
        visible={settingsIsOpen}
        onClose={handleCloseUserSettings}
      />
    </>
  );
};

export default UserCard;
