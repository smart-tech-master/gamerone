import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './style.scss';

export default function SettingsMenu() {
  const match = useRouteMatch();

  return (
    <ul className="settings-nav">
      <li>
        <NavLink
          to={`${match.path}/cards-visibility`}
          activeClassName={'is-active'}
        >
          Cards Visibility
        </NavLink>
      </li>
      <li>
        <NavLink to={`${match.path}/experience`} activeClassName={'is-active'}>
          Experience
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${match.path}/friends/following`}
          activeClassName={'is-active'}
        >
          Following
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${match.path}/friends/followers`}
          activeClassName={'is-active'}
        >
          Followers
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${match.path}/friends/blocks`}
          activeClassName={'is-active'}
        >
          Blocked
        </NavLink>
      </li>
      <li>
        <NavLink to={`${match.path}/games`} activeClassName={'is-active'}>
          Games
        </NavLink>
      </li>
      <li>
        <NavLink to={`${match.path}/gear`} activeClassName={'is-active'}>
          Gear
        </NavLink>
      </li>
      <li>
        <NavLink to={`${match.path}/password`} activeClassName={'is-active'}>
          Change Password
        </NavLink>
      </li>
      <li>
        <NavLink to={`${match.path}/privacy`} activeClassName={'is-active'}>
          Privacy
        </NavLink>
      </li>
    </ul>
  );
}
