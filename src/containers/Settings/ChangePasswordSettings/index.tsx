import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CHECK_PASSWORD_REGEX } from 'utils/constants';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Input from 'components/common/Form/Input';
import { ProfileSettingsRequest } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import { selectUpdateProfileStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';

function ChangePasswordForm() {
  const status = useSelector(selectUpdateProfileStatus);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    watch,
    triggerValidation,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty, isValid } = formState;
  const dispatch = useDispatch();

  const onSubmit = (data: Record<string, any>) => {
    const request = data as ProfileSettingsRequest;
    dispatch(SettingsActions.updateProfile(request));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>Change Password</h4>
          <Input
            type="password"
            name="password"
            label="Existing Password"
            inputRef={register({
              validate: (value) =>
                !value && watch('newPassword') ? 'Password is required' : true,
              minLength: 8,
            })}
            error={errors['password']}
          />
          <Input
            type="password"
            name="newPassword"
            label="New Password"
            inputRef={register({
              validate: (value) => {
                if (value && !watch('password')) triggerValidation('password');
                return true;
              },
              minLength: 8,
              pattern: CHECK_PASSWORD_REGEX,
            })}
            error={errors['newPassword']}
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
            <div aria-label="message">
              Something went wrong. Please try again
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}

export default function ChangePasswordSettings() {
  return <ChangePasswordForm />;
}
