import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Grid from 'components/layout/Grid';
import withChrome from 'components/common/Chrome/withChrome';
import UserCard from 'containers/Cards/UserCard';
import NotFound from 'containers/NotFound';
import ProfileRoute from './route';
import ProfileNav from './ProfileNav';

import { selectCurrentProfile } from 'redux/profile/selectors';
import { selectIsSelfProfile, selectProfileUser } from 'redux/selectors';

import ProfileActions from 'redux/profile/actions';
import { Route } from 'interfaces';
import * as ProfileApi from 'api/profile';
import usePromise from 'lib/usePromise';
import ProfileCover from './ProfileCover';
import { ProfileLayoutProcessTypeEnum } from 'redux/profile/types';

const ChromeGrid = withChrome(Grid);

const Profile: React.FC = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectProfileUser);
  const isSelf = useSelector(selectIsSelfProfile);
  const history = useHistory();
  const dispatch = useDispatch();

  const { username } = useParams();
  const [nameResolving, resolvedProfile, nameError] = usePromise<Route>(
    () => ProfileApi.resolveRoute(username),
    [username],
  );

  const onEditLayout = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.IsEdit,
      ),
    );
    setIsEditing(true);
  };

  const onSaveLayout = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(ProfileLayoutProcessTypeEnum.Save),
    );
    setIsEditing(false);
  };

  const onMakeLayoutDefault = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Default,
      ),
    );
    setIsEditing(false);
  };

  const onCancelEdit = () => {
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Cancel,
      ),
    );
    setIsEditing(false);
  };

  useEffect(() => {
    if (resolvedProfile) {
      dispatch(ProfileActions.setResolvedContent(resolvedProfile));
    }
    if (nameError) dispatch(ProfileActions.setCurrentProfile(null));
  }, [resolvedProfile, nameError, dispatch]);

  const userType = useSelector(selectCurrentProfile)?.type;
  return (
    <>
      {!nameResolving && nameError && <NotFound username={username} />}
      {resolvedProfile && (
        <>
          <ProfileCover />
          <section>
            <ChromeGrid>
              {user &&
                (history.location.pathname === `/${user.username}` ? (
                  <UserCard
                    user={user}
                    isSelf={isSelf}
                    userType={userType}
                    allowEditLayout={true}
                    isEditing={isEditing}
                    onEdit={onEditLayout}
                    onSaveLayoutEdit={onSaveLayout}
                    onDefault={onMakeLayoutDefault}
                    onCancelEdit={onCancelEdit}
                  />
                ) : (
                  <UserCard user={user} isSelf={isSelf} userType={userType} />
                ))}
              <ProfileNav />
            </ChromeGrid>
            <ProfileRoute />
          </section>
        </>
      )}
    </>
  );
};

export default Profile;
