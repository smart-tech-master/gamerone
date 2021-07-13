import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import useSingleParamApi from 'lib/useSingleParamApi';
import * as AccountApi from 'api/account';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { CHECK_PASSWORD_REGEX } from 'utils/constants';
import { ResetPasswordRequest, Nullable } from 'interfaces';
import Input from 'components/common/Form/Input';
import Card from 'components/common/Card';

function PasswordResetNewForm() {
  // type ResetNewQuery = {
  //   email: string;
  //   token: string;
  // };
  const query = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });

  const { register, handleSubmit, errors, watch, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty } = formState;
  const [message, setMessage] = useState<Nullable<string>>(null);

  const [
    { resolved: resetPasswordResponse, error: resetPasswordError },
    doResetPassword,
  ] = useSingleParamApi<ResetPasswordRequest>(AccountApi.resetPassword);

  const onSubmit = (data: Record<string, any>) => {
    doResetPassword({
      email: (query.email as string) || '',
      token: (query.token as string) || '',
      password: data.password,
    });
  };

  useEffect(() => {
    if (resetPasswordError) {
      setMessage(resetPasswordError.message);
    } else if (resetPasswordResponse) {
      setMessage('Password is reset successfully');
    } else {
      setMessage(null);
    }
  }, [resetPasswordResponse, resetPasswordError]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>Set New Password</h4>
          {message && <div role="alert">{message}</div>}
          <Input
            type="password"
            name="password"
            label="New Password"
            inputRef={register({
              required: true,
              minLength: 8,
              validate: (value) =>
                value.match(CHECK_PASSWORD_REGEX) ||
                'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
            })}
            error={errors['password']}
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            inputRef={register({
              required: true,
              minLength: 8,
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
            error={errors['confirmPassword']}
          />
        </div>
        <div className="card__actions">
          <Button scheme={ButtonSchemeEnum.PRIMARY} disabled={!dirty}>
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
}

const PasswordResetNew: React.FC = (): JSX.Element => {
  return <PasswordResetNewForm />;
};

export default PasswordResetNew;
