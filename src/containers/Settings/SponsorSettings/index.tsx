import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/common/Form/Input';
import Avatar from 'components/common/Avatar';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import ListItemProfile from 'components/common/ListItem';

import { SponsorRequest, Sponsor } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import {
  selectDeleteSponsorStatus,
  selectCreateSponsorStatus,
  selectUpdateSponsorStatus,
} from 'redux/request-status/selectors';
import { selectSettingsSponsors } from 'redux/settings/selectors';

import './style.scss';

function SponsorForm() {
  const sponsorsList = useSelector(selectSettingsSponsors);

  const createStatus = useSelector(selectCreateSponsorStatus);
  const updateStatus = useSelector(selectUpdateSponsorStatus);
  const deleteStatus = useSelector(selectDeleteSponsorStatus);

  const [isAdded, setIsAdded] = useState(false); // set true when you click "Add" button to create a new sponsor
  // const [sponsorId, setSponsorId] = useState(0); // set ID of a selected sponsor
  const [currentSponsor, setCurrentSponsor] = useState<Sponsor | undefined>(
    undefined,
  ); // selected sponsor

  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(); // sponsor image string
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    errors,
    reset,
  } = useForm(); // react hook form
  const { dirty } = formState; // dirty will be true if an input field edited

  useEffect(() => {
    register(
      { name: 'sponsorImage' },
      { required: !currentSponsor ? true : false },
    );
    // eslint-disable-next-line
  }, [register]);

  useEffect(() => {
    if (currentSponsor) {
      setUploadedAvatar(currentSponsor.image);
      const formData = {
        sponsorName: currentSponsor?.name,
        sponsorUrl: currentSponsor?.link,
        sponsorImage: '',
      };
      reset(formData);
    } else {
      const formData = {
        sponsorName: '',
        sponsorUrl: '',
        sponsorImage: '',
      };
      reset(formData);
    }
  }, [currentSponsor, reset]);

  // dropzone for sponsor image upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setValue('sponsorImage', acceptedFiles);
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setUploadedAvatar(files[0].preview);
    },
  });

  // on cancel: close the edit form
  const onCancelSponsor = () => {
    setIsAdded(false);
    setUploadedAvatar(null);
    setCurrentSponsor(undefined);
  };

  // on form submit
  const onSubmit = async (
    data: Record<string, any>,
    id: number | undefined,
  ) => {
    if (!uploadedAvatar) return;

    const blob = await fetch(uploadedAvatar).then((r: any) => r.blob());

    if (id) {
      // update a sponsor
      dispatch(
        SettingsActions.updateSponsor(
          {
            name: data.sponsorName,
            link: data.sponsorUrl,
            image: blob,
          } as SponsorRequest,
          id,
        ),
      );
    } else {
      // create a sponsor
      dispatch(
        SettingsActions.createSponsor({
          name: data.sponsorName,
          link: data.sponsorUrl,
          image: blob,
        } as SponsorRequest),
      );
    }
  };

  // after successful form submit(create or update), hide the form
  useEffect(() => {
    if (
      (!createStatus?.isFetching && !createStatus?.isError) ||
      (!updateStatus?.isFetching && !updateStatus?.isError)
    ) {
      onCancelSponsor();
    }
  }, [createStatus, updateStatus]);

  // on delete: remove selected sponsor
  const onDeleteSponsor = () => {
    if (!currentSponsor) return;
    dispatch(SettingsActions.deleteSponsor(currentSponsor.id));
  };

  // after successful deletion, hide the form
  useEffect(() => {
    if (
      !deleteStatus?.isFetching &&
      !deleteStatus?.isError &&
      deleteStatus?.action
    ) {
      onCancelSponsor();
    }
  }, [deleteStatus]);

  return (
    <div className="split-screen">
      <div className="list">
        {sponsorsList.length === 0 ? (
          <div role="alert">You have no sponsors.</div>
        ) : sponsorsList ? (
          sponsorsList.map((sponsor) => (
            <ListItemProfile
              key={sponsor.id}
              title={sponsor.name}
              image={sponsor.image}
              onClick={() => setCurrentSponsor(sponsor)}
            />
          ))
        ) : null}
        <Button
          type="button"
          onClick={() => setIsAdded(true)}
          scheme={ButtonSchemeEnum.PRIMARY}
          disabled={sponsorsList.length >= 5}
        >
          Add
        </Button>
      </div>

      {isAdded || currentSponsor ? (
        <form
          onSubmit={handleSubmit((e) => onSubmit(e, currentSponsor?.id))}
          style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
        >
          <div className="split-screen__content">
            <div>
              <div
                {...getRootProps({
                  className: 'pointer',
                })}
              >
                <input
                  name="sponsorImage"
                  {...getInputProps()}
                  aria-label="file-upload"
                />
                <Avatar
                  src={uploadedAvatar}
                  alt={currentSponsor?.name || 'Logo'}
                  size={'xl'}
                />
              </div>

              {errors['sponsorImage'] && !currentSponsor && (
                <div className="error-text" aria-label="message">
                  Sponsor image is required
                </div>
              )}
            </div>
            <Input
              name="sponsorName"
              label="Name"
              inputRef={register({ required: true, minLength: 3 })}
              error={errors['sponsorName']}
            />
            <Input
              name="sponsorUrl"
              label="Website URL"
              inputRef={register({ required: true, minLength: 3 })}
              error={errors['sponsorUrl']}
            />
          </div>
          <div className="split-screen__actions">
            <Button
              type="button"
              disabled={isAdded}
              onClick={onDeleteSponsor}
              submitting={deleteStatus?.isFetching}
            >
              Delete
            </Button>
            <Button type="button" onClick={onCancelSponsor}>
              Cancel
            </Button>
            <Button
              disabled={!dirty}
              scheme={ButtonSchemeEnum.PRIMARY}
              submitting={createStatus?.isFetching || updateStatus?.isFetching}
            >
              {currentSponsor ? 'Update' : 'Save'}
            </Button>
            {deleteStatus?.isError && (
              <div aria-label="error-message">
                onDelete: Something went wrong. Please try again
              </div>
            )}
            {createStatus?.isError && (
              <div aria-label="error-message">
                onSave: Something went wrong. Please try again
              </div>
            )}
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default function SponsorSettings() {
  return <SponsorForm />;
}
