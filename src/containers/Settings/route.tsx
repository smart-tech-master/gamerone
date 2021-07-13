import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivacySettings from './PrivacySettings';
import ExperienceSettings from './ExperienceSettings';
import GearSettings from './GearSettings';
import GameSettings from './GameSettings';
import FollowingSettings from './FriendSettings/Following';
import FollowersSettings from './FriendSettings/Followers';
import BlocksSettings from './FriendSettings/Blocks';
import ChangePasswordSettings from './ChangePasswordSettings';
import CardsVisibilitySettings from './CardsVisibilitySettings';

export default function SettingsRoute() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route
        path={`${match.path}/cards-visibility`}
        component={CardsVisibilitySettings}
      />
      <Route path={`${match.path}/experience`} component={ExperienceSettings} />
      <Route
        path={`${match.path}/friends/following`}
        component={FollowingSettings}
      />
      <Route
        path={`${match.path}/friends/followers`}
        component={FollowersSettings}
      />
      <Route path={`${match.path}/friends/blocks`} component={BlocksSettings} />
      <Route path={`${match.path}/games`} component={GameSettings} />
      <Route path={`${match.path}/gear`} component={GearSettings} />
      <Route
        path={`${match.path}/password`}
        component={ChangePasswordSettings}
      />
      <Route path={`${match.path}/privacy`} component={PrivacySettings} />
    </Switch>
  );
}
