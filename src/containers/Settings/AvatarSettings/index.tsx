import React, { useState, useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import Avatar from 'components/common/Avatar';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Card from 'components/common/Card';
import EditImageCard from 'containers/Cards/EditImageCard';
import { selectCurrentUser } from 'redux/auth/selectors';
import { selectUploadAvatarStatus } from 'redux/request-status/selectors';
import SettingsActions from 'redux/settings/actions';
import RequestStatusActions from 'redux/request-status/actions';
import { AVATAR_WIDTH, AVATAR_HEIGHT } from 'utils/constants';
import { RootState } from 'redux/types';
import { UPLOAD_AVATAR_REQUEST } from 'redux/settings/types';

import './style.scss';

interface Props {
  submitTitle?: string;
}
const AvatarForm: React.FC<Props & AvatarFormProps> = ({
  user,
  status,
  submitTitle = 'Upload',
  dispatchUploadAvatar,
  dispatchCleanForm,
}: Props & AvatarFormProps): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const { username, avatar } = user;
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(
    user.avatar,
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setEditing(true);
      setUploadedAvatar(files[0].preview);
    },
  });

  useEffect(() => {
    setUploadedAvatar(user.avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    return () => {
      dispatchCleanForm();
    };
  }, [dispatchCleanForm]);

  const handleCancel = () => {
    setUploadedAvatar(avatar);
    setEditing(false);
  };

  const handleApply = (blobUrl: string) => {
    setUploadedAvatar(blobUrl);
    setEditing(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!uploadedAvatar) return;

    const blob = await fetch(uploadedAvatar).then((r: any) => r.blob());
    const file = new File([blob], 'f.png', {
      type: blob.type,
      lastModified: Date.now(),
    });

    dispatchUploadAvatar(file);
  };

  return (
    <>
      <Card>
        <form>
          <div className="card__content">
            <h4>Profile Image</h4>

            {status?.isError && (
              <div role="alert">Something went wrong. Please try again</div>
            )}

            <div {...getRootProps({ className: 'pointer' })}>
              <input {...getInputProps()} aria-label="file-upload" />
              <Avatar
                src={uploadedAvatar ? uploadedAvatar : avatar}
                alt={username || ''}
                size={'xl'}
                className="avatar-upload"
              />
            </div>
          </div>
          <div className="card__actions">
            <Button
              scheme={ButtonSchemeEnum.PRIMARY}
              onClick={handleUpload}
              submitting={status?.isFetching}
              disabled={avatar === uploadedAvatar}
            >
              {submitTitle}
            </Button>
          </div>
        </form>
      </Card>
      {uploadedAvatar && (
        <EditImageCard
          image={uploadedAvatar}
          visible={editing}
          title="Edit Profile Image"
          onCancel={handleCancel}
          onApply={handleApply}
          width={AVATAR_WIDTH / 2}
          height={AVATAR_HEIGHT / 2}
          borderRadius={100}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectCurrentUser(state),
    status: selectUploadAvatarStatus(state),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    dispatchUploadAvatar: (f: File) =>
      dispatch(SettingsActions.uploadAvatar(f)),
    dispatchCleanForm: () =>
      dispatch(RequestStatusActions.cleanStatus(UPLOAD_AVATAR_REQUEST)),
  };
}

type AvatarFormProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const ConnectedAvatarForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarForm);

export default function AvatarSettings() {
  return <ConnectedAvatarForm />;
}
