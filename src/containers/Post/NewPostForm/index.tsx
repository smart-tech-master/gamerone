import React, { memo, useState, useCallback, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import NewPostImageContainer from 'containers/Post/NewPostImageContainer';

import { RootState } from 'redux/types';
import {
  selectPostFormImageUploadStatus,
  selectPostFormStatus,
} from 'redux/request-status/selectors';
import PostActions from 'redux/post/actions';
import PostFormActions from 'redux/post-form/actions';
import RequestStatusActions from 'redux/request-status/actions';
import DiscoverGames from 'components/common/DiscoverGames';
import { Game } from 'interfaces';
import { selectImagePaths } from 'redux/post-form/selectors';
import Input from 'components/common/Form/Input';
import { ADD_POST_REQUEST } from 'redux/post/types';
import { UPLOAD_IMAGE_REQUEST } from 'redux/post-form/types';
import Card, { CardTypeEnum } from 'components/common/Card';
import { POST_VISIBILITY_OPTIONS } from 'containers/Settings/PrivacySettings/options';
import Checkbox from 'components/common/Form/Checkbox';
import { selectUserPrivacy } from 'redux/settings/selectors';

import './style.scss';
import InputLoading from 'components/common/Form/InputLoading';

function NewPostForm({
  privacy,
  imagePaths,
  formStatus,
  imageUploadStatus,
  dispatchAddPost,
  dispatchAddImage,
  dispatchInitForm,
  dispatchCleanStatus,
}: MappedProps) {
  const [visibleDiscoverGames, showDiscoverGames] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { dirty, isValid } = formState;
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) =>
        dispatchAddImage(URL.createObjectURL(file)),
      );
    },
  });

  const onSubmit = (data: Record<string, any>) => {
    dispatchAddPost({
      title: data.title,
      description: data.description,
      privacy: data.privacy,
      commentsEnabled: !data.commentsDisabled,
      gameIds: games.map((g) => g.id),
      images: Object.keys(imagePaths)
        .map((k) => imagePaths[parseInt(k, 10)].file)
        .filter((f) => f !== undefined) as string[],
    });
  };

  const handleGamesDiscovered = useCallback((games: Game[]) => {
    console.log('games', games);
    setGames(games);
    showDiscoverGames(false);
  }, []);

  const handleCancelDiscover = useCallback(() => {
    showDiscoverGames(false);
  }, []);

  useEffect(() => {
    return () => {
      dispatchInitForm();
      dispatchCleanStatus(ADD_POST_REQUEST);
      dispatchCleanStatus(UPLOAD_IMAGE_REQUEST);
    };
  }, [dispatchInitForm, dispatchCleanStatus]);

  useEffect(() => {
    if (!formStatus?.isFetching && !formStatus?.isError) {
      console.log('Succssfully posted! resetting form...');
      reset({
        title: '',
        description: '',
      });
      setGames([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStatus?.isFetching, formStatus?.isError, reset]);

  useEffect(() => {
    reset({
      visibility: privacy.postVisibility,
    });
  }, [reset, privacy.postVisibility]);

  return (
    <Card
      type={CardTypeEnum.POST}
      style={{ gridColumn: '3 / span 2', gridRow: '1 / span 2' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card__content">
          <h4>New Post</h4>

          {formStatus?.isError && (
            <div role="alert">Something went wrong. Please try again</div>
          )}

          <Input
            type="text"
            name="title"
            label="Title"
            inputRef={register({
              required: true,
              minLength: 1,
              maxLength: 255,
            })}
            error={errors['title']}
          />
          <Input
            type="textarea"
            name="description"
            label="Description"
            inputRef={register({
              maxLength: 500,
            })}
            error={errors['description']}
          />
          <Input
            type="select"
            name="visibility"
            label="Visibility"
            selectRef={register}
            selectOptions={POST_VISIBILITY_OPTIONS}
            selectInitValue={privacy.postVisibility}
          />
          <Checkbox
            name="commentsDisabled"
            label="Disable Comments"
            inputRef={register}
          />

          <NewPostImageContainer />

          <InputLoading show={imageUploadStatus?.isFetching} />

          <div className="post__games">
            <Button type="button" onClick={() => showDiscoverGames(true)}>
              Games:
            </Button>
            <div className="games">
              {games.map((game) => (
                <a href={`/${game.name}`} key={game.id}>
                  {game.name}
                </a>
              ))}
            </div>
          </div>

          <DiscoverGames
            initGames={games}
            show={visibleDiscoverGames}
            onFinish={handleGamesDiscovered}
            onCancel={handleCancelDiscover}
          />

          <div>
            <div
              {...getRootProps({
                className: 'pointer',
              })}
            >
              <input {...getInputProps()} aria-label="file-upload" />
              <Button type="button">Add Image</Button>
            </div>
          </div>
        </div>
        <div className="card__actions">
          <Button
            type="submit"
            scheme={ButtonSchemeEnum.PRIMARY}
            disabled={!dirty || !isValid || imageUploadStatus?.isFetching}
            submitting={formStatus?.isFetching}
          >
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  formStatus: selectPostFormStatus(state),
  privacy: selectUserPrivacy(state),
  imagePaths: selectImagePaths(state),
  imageUploadStatus: selectPostFormImageUploadStatus(state),
});

const mapDispatchToProps = {
  dispatchAddPost: PostActions.addNewPost,
  dispatchAddImage: PostFormActions.addImage,
  dispatchInitForm: PostFormActions.initForm,
  dispatchCleanStatus: RequestStatusActions.cleanStatus,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NewPostForm) as React.ElementType;
