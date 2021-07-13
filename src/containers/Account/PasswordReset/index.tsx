import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import useSingleParamApi from 'lib/useSingleParamApi';
import * as AccountApi from 'api/account';
import { CHECK_EMAIL_REGEX } from 'utils/constants';
import { ForgotPasswordRequest, Nullable } from 'interfaces';
import Input from 'components/common/Form/Input';
import Card from 'components/common/Card';

function PasswordResetForm() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty } = formState;
  const [message, setMessage] = useState<Nullable<string>>(null);
  const [
    { resolved: forgotPasswordResponse, error: forgotPasswordError },
    doForgotPassword,
  ] = useSingleParamApi<ForgotPasswordRequest>(AccountApi.forgotPassword);

  const onSubmit = (data: Record<string, any>) => {
    doForgotPassword(data as ForgotPasswordRequest);
  };

  useEffect(() => {
    if (forgotPasswordError) {
      setMessage(forgotPasswordError.message);
    } else if (forgotPasswordResponse) {
      setMessage('Password reset email is sent to this address');
    } else {
      setMessage(null);
    }
  }, [forgotPasswordResponse, forgotPasswordError]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>Password Reset</h4>

          {message && <div role="alert">{message}</div>}
          <Input
            name="email"
            label="Email"
            inputRef={register({
              required: true,
              pattern: CHECK_EMAIL_REGEX,
            })}
            error={errors['email']}
          />
        </div>
        <div className="card__actions">
          <Button scheme={ButtonSchemeEnum.PRIMARY} disabled={!dirty}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

const PasswordReset: React.FC = (): JSX.Element => {
  return <PasswordResetForm />;
};

export default PasswordReset;
