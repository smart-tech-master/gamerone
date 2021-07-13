import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { selectCurrentUser } from 'redux/auth/selectors';
import { selectUpdateProfileStatus } from 'redux/request-status/selectors';
import SettingsActions from 'redux/settings/actions';
import RequestStatusActions from 'redux/request-status/actions';
import { UPDATE_PROFILE_REQUEST } from 'redux/settings/types';
import * as AuthApi from 'api/auth';
import debounce from 'lib/debounce';
import useSingleParamApi from 'lib/useSingleParamApi';
import { CHECK_EMAIL_REGEX } from 'utils/constants';
import { ProfileSettingsRequest } from 'interfaces';
import Input from 'components/common/Form/Input';
import DatePickerInput from 'components/common/Form/DatePickerInput';
import Card from 'components/common/Card';
import { ErrorTypeEnum } from 'models/error';
import InputLoading from 'components/common/Form/InputLoading';

const DUPLICATE_ERROR_MSG = 'Duplicated';

function ProfileForm() {
  const formData = useSelector(selectCurrentUser);
  const status = useSelector(selectUpdateProfileStatus);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState,
    reset,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty, isValid } = formState;
  const [
    {
      resolved: checkEmailResolved,
      error: checkEmailError,
      loading: emailChecking,
    },
    doCheckEmail,
  ] = useSingleParamApi(AuthApi.checkEmail);

  const [
    {
      resolved: checkUsernameResolved,
      error: checkUsernameError,
      loading: usernameChecking,
    },
    doCheckUsername,
  ] = useSingleParamApi(AuthApi.checkUsername);

  useEffect(() => {
    return () => {
      dispatch(RequestStatusActions.cleanStatus(UPDATE_PROFILE_REQUEST));
    };
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(formData).length) reset(formData);
  }, [formData, reset]);

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

  const onSubmit = (data: Record<string, any>) => {
    dispatch(SettingsActions.updateProfile(data as ProfileSettingsRequest));
  };

  const handleEmailChange = debounce((email) => {
    if (!email.match(CHECK_EMAIL_REGEX)) return;
    if (email === formData.email) return;
    if (!errors.email || errors.email.type === ErrorTypeEnum.Validate) {
      doCheckEmail(email);
    }
  }, 800);

  const handleUsernameChange = debounce((username) => {
    if (username === formData.username) return;
    if (!errors.username || errors.username.type === ErrorTypeEnum.Validate) {
      doCheckUsername(username);
    }
  }, 800);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>Profile</h4>
          <Input
            name="username"
            label="Username"
            inputRef={register({
              required: true,
              minLength: 3,
              validate: () =>
                checkUsernameError === null || DUPLICATE_ERROR_MSG,
            })}
            onChange={(e) => handleUsernameChange(e.target.value)}
            error={errors['username']}
            appendRight={<InputLoading show={usernameChecking} />}
          />
          <Input
            name="email"
            label="Email"
            inputRef={register({
              required: true,
              pattern: CHECK_EMAIL_REGEX,
              validate: () => checkEmailError === null || DUPLICATE_ERROR_MSG,
            })}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={errors['email']}
            appendRight={<InputLoading show={emailChecking} />}
          />
          <Input
            name="firstName"
            label="First Name"
            inputRef={register({ required: true, minLength: 2 })}
            error={errors['firstName']}
          />
          <Input
            name="lastName"
            label="Last Name"
            inputRef={register({ required: true, minLength: 2 })}
            error={errors['lastName']}
          />
          <Input
            name="location"
            label="Location"
            inputRef={register({
              required: true,
              minLength: 2,
              maxLength: 100,
            })}
            error={errors['location']}
          />
          <Input
            type="textarea"
            name="bio"
            label="Bio"
            textareaRef={register}
          />
          <DatePickerInput
            name="birthDate"
            label="Birth Date"
            initValue={formData.birthDate}
            inputRef={register}
          />
          <Input
            name="websiteUrl"
            label="Website URL"
            inputRef={register}
            error={errors['websiteUrl']}
          />
        </div>
        <div className="card__actions">
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            disabled={!dirty || !isValid}
            submitting={status?.isFetching}
          >
            Save
          </Button>
          {status?.isError && (
            <div className="error-text" aria-label="message">
              Something went wrong. Please try again
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}

export default function ProfileSettings() {
  return <ProfileForm />;
}
