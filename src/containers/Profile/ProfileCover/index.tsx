import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentProfileUser } from 'redux/profile/selectors';

import { selectCurrentUser } from 'redux/auth/selectors';
import { UserModel } from 'models/user';
import {
  CDN_URL,
  BANNER_WIDTH,
  BANNER_HEIGHT,
  BANNER_PLACEHOLDER,
} from 'utils/constants';
import './style.scss';

const ProfileCover: React.FC = (): JSX.Element => {
  const { pathname } = useLocation();

  const profile =
    useSelector(
      pathname === '/' ? selectCurrentUser : selectCurrentProfileUser,
    ) || new UserModel();
  const { banner } = profile;
  const bannerUrl =
    banner !== null && !banner.startsWith('blob:')
      ? CDN_URL + `/${BANNER_WIDTH}x${BANNER_HEIGHT}/` + banner
      : banner === null
      ? BANNER_PLACEHOLDER
      : banner;

  return (
    <section
      className="cover"
      style={{
        backgroundImage: `url(${bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
      }}
      aria-label="cover"
    />
  );
};

export default ProfileCover;
