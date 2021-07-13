import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Achievements from './Achievements/index';
import Experience from './Experience/index';
import Games from './Games/index';
import Gear from './Gear/index';
import Overview from './Overview';
import withChrome from 'components/common/Chrome/withChrome';

const ProfileRoute: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route
        path={`${match.path}/achievements`}
        component={withChrome(Achievements, 200)}
      />
      <Route
        path={`${match.path}/experience`}
        component={withChrome(Experience, 200)}
      />
      <Route path={`${match.path}/games`} component={withChrome(Games, 200)} />
      <Route path={`${match.path}/gear`} component={withChrome(Gear, 200)} />
      <Route path={`${match.path}`} component={withChrome(Overview, 200)} />
    </Switch>
  );
};

export default ProfileRoute;
