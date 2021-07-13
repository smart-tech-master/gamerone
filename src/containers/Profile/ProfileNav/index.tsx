import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './style.scss';
import Icon, { IconNameEnum } from 'components/common/Icon';

const ProfileNav: React.FC = (): JSX.Element => {
  const { username } = useParams();
  return (
    <div className="cover-spacer">
      <ul className="profile-nav">
        <li>
          <NavLink exact to={'/' + username} activeClassName="is-active">
            <Icon name={IconNameEnum.USER_NETWORK} />
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/' + username + '/achievements'}
            activeClassName="is-active"
          >
            <Icon name={IconNameEnum.TROPHY_STAR} />
            Achievements
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/' + username + '/experience'}
            activeClassName="is-active"
          >
            <Icon name={IconNameEnum.AWARD_MEDAL} />
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink to={'/' + username + '/gear'} activeClassName="is-active">
            <Icon name={IconNameEnum.KEYBOARD} />
            Gear
          </NavLink>
        </li>
        <li>
          <NavLink to={'/' + username + '/games'} activeClassName="is-active">
            <Icon name={IconNameEnum.GAME_PACMAN} />
            Games
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileNav;
