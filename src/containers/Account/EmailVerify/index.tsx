import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as AuthApi from 'api/auth';
import Spinner from 'components/common/Form/InputLoading/index';
import Card from 'components/common/Card';

function SuccessMesage() {
  return (
    <div>
      <div role="alert">
        Your email is verified. You can use your account now.
      </div>
      <Link to="/login">Login</Link>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div>
      <div role="alert">
        Your account is not found. Or, your link might be expired.
      </div>
      <Link to="/">Return Home</Link>
    </div>
  );
}

const EmailVerify: React.FC = (): JSX.Element => {
  const { email, token } = useParams<{ email: string; token: string }>();
  const [verified, setVerified] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const doVerifyToken = async () => {
      try {
        await AuthApi.verifyEmail({ email, verifyToken: token });
        setVerified(true);
      } catch (e) {
        setVerified(false);
      } finally {
        setDone(true);
      }
    };

    doVerifyToken();
  }, [email, token]);

  return (
    <Card>
      <div className="card__content">
        <Spinner show={!done} floatRight={false} />
        {done && verified && <SuccessMesage />}
        {done && !verified && <ErrorMessage />}
      </div>
    </Card>
  );
};

export default EmailVerify;
