import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dispatch, AnyAction } from 'redux';
import Card from 'components/common/Card';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { UserPrivacy } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import { selectUpdatePrivacyStatus } from 'redux/request-status/selectors';
import RequestStatusActions from 'redux/request-status/actions';
import { selectUserPrivacy } from 'redux/settings/selectors';
import { RootState } from 'redux/types';
import { UPDATE_PRIVACY_REQUEST } from 'redux/settings/types';
import { NAME_VISIBILITY_OPTIONS, POST_VISIBILITY_OPTIONS } from './options';
import Input from 'components/common/Form/Input';

function PrivacyForm({
  privacy,
  status,
  dispatchUpdatePrivacy,
  dispatchCleanForm,
}: PrivacyFormProps) {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty, isValid } = formState;

  const onSubmit = (data: Record<string, any>) => {
    dispatchUpdatePrivacy(data as UserPrivacy);
  };

  useEffect(() => {
    reset(privacy);
    return () => {
      dispatchCleanForm();
    };
  }, [reset, privacy, dispatchCleanForm]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>Privacy</h4>
          <Input
            type="select"
            name="nameVisibility"
            label="Name Visibility"
            selectRef={register}
            selectOptions={NAME_VISIBILITY_OPTIONS}
            selectInitValue={privacy.nameVisibility}
          />
          <Input
            type="select"
            name="postVisibility"
            label="Post Visibility"
            selectRef={register}
            selectOptions={POST_VISIBILITY_OPTIONS}
            selectInitValue={privacy.postVisibility}
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
            <div aria-label="error-message">
              Something went wrong. Please try again
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    privacy: selectUserPrivacy(state),
    status: selectUpdatePrivacyStatus(state),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    dispatchUpdatePrivacy: (p: UserPrivacy) =>
      dispatch(SettingsActions.updatePrivacy(p)),
    dispatchCleanForm: () =>
      dispatch(RequestStatusActions.cleanStatus(UPDATE_PRIVACY_REQUEST)),
  };
}

type PrivacyFormProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const ConnectedPrivacyForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivacyForm);

export default function PrivacySettings() {
  return <ConnectedPrivacyForm />;
}
