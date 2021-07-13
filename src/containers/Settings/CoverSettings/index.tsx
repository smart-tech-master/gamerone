import React, { useState, useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';

// components
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import EditImageCard from 'containers/Cards/EditImageCard';

import { selectCurrentUser } from 'redux/auth/selectors';
import { selectUploadBannerStatus } from 'redux/request-status/selectors';
import SettingsActions from 'redux/settings/actions';
import RequestStatusActions from 'redux/request-status/actions';
import { BANNER_WIDTH, BANNER_HEIGHT } from 'utils/constants';
import { RootState } from 'redux/types';
import './style.scss';
import { UPLOAD_BANNER_REQUEST } from 'redux/settings/types';
import Card from 'components/common/Card';
import CoverImage from './CoverImage';

const BannerForm: React.FC<BannerFormProps> = ({
  user,
  status,
  dispatchUploadBanner,
  dispatchCleanForm,
}: BannerFormProps): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const { banner } = user;
  const [uploadedBanner, setUploadedBanner] = useState<string | null>(
    user.banner,
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
      setUploadedBanner(files[0].preview);
    },
  });

  useEffect(() => {
    setUploadedBanner(user.banner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    return () => {
      dispatchCleanForm();
    };
  }, [dispatchCleanForm]);

  const handleCancel = () => {
    setUploadedBanner(banner);
    setEditing(false);
  };

  const handleApply = (blobUrl: string) => {
    setUploadedBanner(blobUrl);
    setEditing(false);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!uploadedBanner) return;

    const blob = await fetch(uploadedBanner).then((r: any) => r.blob());
    const file = new File([blob], 'f.png', {
      type: blob.type,
      lastModified: Date.now(),
    });

    dispatchUploadBanner(file);
  };

  return (
    <>
      <Card>
        <form>
          <div className="card__content">
            <h4>Header Image</h4>

            {status?.isError && (
              <div role="alert">Something went wrong. Please try again</div>
            )}

            <div {...getRootProps({ className: 'pointer' })}>
              <input {...getInputProps()} aria-label="file-upload" />
              <CoverImage
                src={uploadedBanner}
                alt="Header Image"
                title="Click here to upload new header image"
                width={BANNER_WIDTH / 3}
                height={BANNER_HEIGHT / 3}
              />
            </div>
          </div>
          <div className="card__actions">
            <Button
              scheme={ButtonSchemeEnum.PRIMARY}
              onClick={handleUpload}
              submitting={status?.isFetching}
              disabled={banner === uploadedBanner}
            >
              Upload
            </Button>
          </div>
        </form>
      </Card>
      {uploadedBanner && (
        <EditImageCard
          image={uploadedBanner}
          visible={editing}
          title="Edit Header Image"
          onCancel={handleCancel}
          onApply={handleApply}
          width={BANNER_WIDTH / 3}
          height={BANNER_HEIGHT / 3}
          borderRadius={0}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectCurrentUser(state),
    status: selectUploadBannerStatus(state),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    dispatchUploadBanner: (f: File) =>
      dispatch(SettingsActions.uploadBanner(f)),
    dispatchCleanForm: () =>
      dispatch(RequestStatusActions.cleanStatus(UPLOAD_BANNER_REQUEST)),
  };
}

type BannerFormProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const ConnectedBannerForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BannerForm);

export default function CoverSettings() {
  return <ConnectedBannerForm />;
}
