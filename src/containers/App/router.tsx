import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, RouteProps } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { RouterProps } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
// components
import Home from '../Home';
import Account from '../Account';
import Login from '../Auth/Login';
import SignupProcessRoute from '../Auth/Signup/route';
// actions
import AuthActions from 'redux/auth/actions';
// provider
import { AuthContext, AuthProvider } from 'provider/auth';

import Profile from 'containers/Profile';
import Settings from 'containers/Settings';
import {
  selectIsAuthenticated,
  selectCurrentUserAvatar,
  selectCurrentUser,
} from 'redux/auth/selectors';

import { RootState } from 'redux/types';
import { Nullable, User } from 'interfaces';
import Header from 'components/layout/Header';

export const RestrictedRoute = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const TypedComponent = Component as React.ElementType;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <TypedComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const LoggedOutRoute = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const TypedComponent = Component as React.ElementType;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <TypedComponent {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

interface RootRoutesProps {
  history: RouterProps['history'];
  isAuthenticated: boolean;
  user: User;
  userAvatar: Nullable<string>;
  dispatchLogout: () => void;
}

const RootRoutes = ({
  history,
  isAuthenticated,
  user,
  userAvatar,
  dispatchLogout,
}: RootRoutesProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.checkAuthorization());
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <AuthProvider isAuthenticated={isAuthenticated}>
        <Header
          handleLogout={dispatchLogout}
          username={user.username}
          avatar={userAvatar}
        />
        <main>
          <Route exact path="/" component={Home} />
          <Switch>
            <LoggedOutRoute path="/login" component={Login} />
            <Route path="/signup" component={SignupProcessRoute} />
            <RestrictedRoute path="/settings" component={Settings} />
            <Route path="/account" component={Account} />
            <Route path="/:username" component={Profile} />
          </Switch>

          <ToastContainer position="top-right" pauseOnHover={false} />
        </main>
      </AuthProvider>
    </ConnectedRouter>
  );
};

export default connect(
  (state: RootState) => ({
    isAuthenticated: selectIsAuthenticated(state),
    user: selectCurrentUser(state),
    userAvatar: selectCurrentUserAvatar(state),
  }),
  { dispatchLogout: AuthActions.logout },
)(RootRoutes);
