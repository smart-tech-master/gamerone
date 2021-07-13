import React, { useState, useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Avatar from 'components/common/Avatar';
import EditImage from 'components/common/EditImage';
import { useDropzone } from 'react-dropzone';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

import { selectCurrentUser } from 'redux/auth/selectors';
import { selectUploadAvatarStatus } from 'redux/request-status/selectors';
import SettingsActions from 'redux/settings/actions';
import RequestStatusActions from 'redux/request-status/actions';

import { AVATAR_WIDTH, AVATAR_HEIGHT } from 'utils/constants';
import { RootState } from 'redux/types';

import { UPLOAD_AVATAR_REQUEST } from 'redux/settings/types';
import Card from 'components/common/Card';

function UploadAvatar({
  user,
  status,
  dispatchCleanForm,
  dispatchUploadAvatar,
}: MappedProps) {
  const history = useHistory();
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

  const handleSkip = () => {
    history.push('/signup/follows');
  };

  const formFooter = (
    <div>
      {status?.isError && (
        <div aria-label="error-message">
          Something went wrong. Please try again, or skip for now.
        </div>
      )}
      <div>
        <Button onClick={handleSkip}>Skip the step</Button>
        <Button
          scheme={ButtonSchemeEnum.PRIMARY}
          onClick={handleUpload}
          submitting={status?.isFetching}
        >
          Next Step
        </Button>
      </div>
    </div>
  );

  return (
    <Card>
      <div className="card__content">
        <h4>Upload Avatar</h4>
        <form>
          <div {...getRootProps({ className: 'pointer' })}>
            <input {...getInputProps()} aria-label="file-upload" />
            <Avatar
              src={uploadedAvatar ? uploadedAvatar : avatar}
              alt={username || ''}
              size={'xl'}
              className="avatar-upload"
            />
          </div>

          {uploadedAvatar && (
            <EditImage
              image={uploadedAvatar}
              visible={editing}
              title="Edit avatar"
              onCancel={handleCancel}
              onApply={handleApply}
              width={AVATAR_WIDTH}
              height={AVATAR_HEIGHT}
              borderRadius={AVATAR_WIDTH / 2}
            />
          )}
        </form>
      </div>
      <div className="card__actions">{formFooter}</div>
    </Card>
  );
}

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

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
