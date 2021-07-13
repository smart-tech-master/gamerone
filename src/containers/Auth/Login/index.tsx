import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RouteProps } from 'react-router';
import { useLocation, Link } from 'react-router-dom';

// components
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Page from 'components/layout/Page';
import withChrome from 'components/common/Chrome/withChrome';
import Input from 'components/common/Form/Input';
import Card from 'components/common/Card';

import { LoginActionPayload } from 'models/auth';
import { LoginRequest } from 'interfaces';

import { RootState } from 'redux/types';
import AuthActions from 'redux/auth/actions';
import { selectLoginStatus } from 'redux/request-status/selectors';
import RequestStatusActions from 'redux/request-status/actions';
import { LOGIN_REQUEST } from 'redux/auth/types';

function LogInForm({
  status,
  dispatchLogin,
  dispatchCleanStatus,
}: LoginFormProps) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty } = formState;
  const location: RouteProps['location'] & {
    state: { from: { pathname: string } };
  } = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const onSubmit = (data: Record<string, any>) => {
    dispatchLogin(
      new LoginActionPayload().fromRequest(data as LoginRequest, from),
    );
  };

  useEffect(() => {
    return () => {
      dispatchCleanStatus(LOGIN_REQUEST);
    };
  }, [dispatchCleanStatus]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>Login</h4>
          {status?.isError && (
            <div role="alert">Something went wrong. Please try again</div>
          )}
          <Input
            type="text"
            name="email"
            label="Email"
            inputRef={register({ required: true })}
            error={errors['email']}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            inputRef={register({
              required: true,
              minLength: 8,
            })}
            error={errors['password']}
          />
        </div>
        <div className="card__actions">
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            disabled={!dirty}
            submitting={status?.isFetching}
          >
            Log In
          </Button>
          <Link to={'/account/password-reset'}>Forgot Password?</Link>
        </div>
      </form>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  status: selectLoginStatus(state),
});

const mapDispatchToProps = {
  dispatchLogin: AuthActions.login,
  dispatchCleanStatus: RequestStatusActions.cleanStatus,
};

type LoginFormProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInForm);

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <Page>
      <ConnectedLoginForm />
    </Page>
  );
};

export default withChrome(LoginPage);
