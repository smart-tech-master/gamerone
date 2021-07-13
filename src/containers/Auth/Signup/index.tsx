import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

// components
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import useSingleParamApi from 'lib/useSingleParamApi';
import * as AuthApi from 'api/auth';
import debounce from 'lib/debounce';
import { CHECK_EMAIL_REGEX, CHECK_PASSWORD_REGEX } from 'utils/constants';
import {
  SignupRequest,
  CheckUsernameRequest,
  CheckEmailRequest,
} from 'interfaces';
import { SignupActionPayload } from 'models/auth';
import Input from 'components/common/Form/Input';
import Card from 'components/common/Card';

import { RootState } from 'redux/types';
import AuthActions from 'redux/auth/actions';
import { selectSignupStatus } from 'redux/request-status/selectors';
import RequestStatusActions from 'redux/request-status/actions';
import { SIGNUP_REQUEST } from 'redux/auth/types';
import Page from 'components/layout/Page';
import { ErrorTypeEnum } from 'models/error';
import InputLoading from 'components/common/Form/InputLoading';

const DUPLICATE_ERROR_MSG = 'Duplicated';

function SignUpForm({
  status,
  dispatchSignup,
  dispatchCleanStatus,
}: SignupFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty } = formState;

  const [
    {
      resolved: checkEmailResolved,
      error: checkEmailError,
      loading: emailChecking,
    },
    doCheckEmail,
  ] = useSingleParamApi<CheckEmailRequest>(AuthApi.checkEmail);
  const [
    {
      resolved: checkUsernameResolved,
      error: checkUsernameError,
      loading: usernameChecking,
    },
    doCheckUsername,
  ] = useSingleParamApi<CheckUsernameRequest>(AuthApi.checkUsername);

  const onSubmit = (data: Record<string, any>) => {
    dispatchSignup(
      new SignupActionPayload().fromRequest(data as SignupRequest, true),
    );
  };

  const handleEmailChange = debounce((email) => {
    if (!email.match(CHECK_EMAIL_REGEX)) return;
    if (!errors.email || errors.email.type === ErrorTypeEnum.Validate) {
      doCheckEmail(email);
    }
  }, 600);

  const handleUsernameChange = debounce((username) => {
    if (!errors.username || errors.username.type === ErrorTypeEnum.Validate) {
      doCheckUsername(username);
    }
  }, 600);

  useEffect(() => {
    if (checkEmailError) {
      setError('email', ErrorTypeEnum.Validate, DUPLICATE_ERROR_MSG);
    }
    if (checkEmailResolved) {
      clearError('email');
    }
  }, [checkEmailResolved, checkEmailError, clearError, setError]);

  useEffect(() => {
    if (checkUsernameError) {
      setError('username', ErrorTypeEnum.Validate, DUPLICATE_ERROR_MSG);
    }
    if (checkUsernameResolved) {
      clearError('username');
    }
  }, [checkUsernameResolved, checkUsernameError, clearError, setError]);

  useEffect(() => {
    return () => {
      dispatchCleanStatus(SIGNUP_REQUEST);
    };
  }, [dispatchCleanStatus]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>Sign Up</h4>
          <Input
            type="text"
            name="email"
            label="Email"
            inputRef={register({
              required: true,
              pattern: CHECK_EMAIL_REGEX,
              validate: () => checkEmailError === null || DUPLICATE_ERROR_MSG,
            })}
            onChange={(e) => handleEmailChange(e.target.value)}
            appendRight={<InputLoading show={emailChecking} />}
            error={errors['email']}
          />
          <Input
            type="text"
            name="username"
            label="Username"
            inputRef={register({
              required: true,
              minLength: 3,
              maxLength: 100,
              validate: () =>
                checkUsernameError === null || DUPLICATE_ERROR_MSG,
            })}
            maxLength={100}
            onChange={(e) => handleUsernameChange(e.target.value)}
            appendRight={<InputLoading show={usernameChecking} />}
            error={errors['username']}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            inputRef={register({
              required: true,
              minLength: 8,
              maxLength: 100,
              pattern: CHECK_PASSWORD_REGEX,
            })}
            maxLength={100}
            hint="A password must contain an uppercase, lowercase, a special character and a number"
            error={errors['password']}
          />
        </div>
        <div className="card__actions">
          {status?.isError && (
            <div aria-label="message">
              Something went wrong. Please try again
            </div>
          )}
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            disabled={!dirty}
            submitting={status?.isFetching}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  status: selectSignupStatus(state),
});

const mapDispatchToProps = {
  dispatchSignup: AuthActions.signUp,
  dispatchCleanStatus: RequestStatusActions.cleanStatus,
};

type SignupFormProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ConnectedSignUpForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);

const SignupPage: React.FC = (): JSX.Element => {
  return (
    <Page>
      <ConnectedSignUpForm />
    </Page>
  );
};

export default SignupPage;
