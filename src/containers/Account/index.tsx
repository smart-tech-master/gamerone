import React from 'react';
import { useRouteMatch, Switch } from 'react-router-dom';
import withChrome from 'components/common/Chrome/withChrome';

// routes
import { LoggedOutRoute, RestrictedRoute } from '../App/router';
import PasswordReset from './PasswordReset';
import PasswordResetNew from './PasswordResetNew';
import EmailVerify from './EmailVerify';
import Page from 'components/layout/Page';

const Account: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <Page>
      <Switch>
        <LoggedOutRoute
          path={`${match.path}/password-reset-new`}
          component={PasswordResetNew}
        />
        <LoggedOutRoute
          path={`${match.path}/password-reset`}
          component={PasswordReset}
        />
        <LoggedOutRoute
          path={`${match.path}/email-verify/:email/:token`}
          component={EmailVerify}
        />
        <RestrictedRoute path="*" component={() => <h2>Account page</h2>} />
      </Switch>
    </Page>
  );
};

export default withChrome(Account);
