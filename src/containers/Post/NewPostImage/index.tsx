import React, { useCallback, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Image from 'components/common/Image';
import Icon, { IconNameEnum } from 'components/common/Icon';

import PostFormActions from 'redux/post-form/actions';
import { PostFormImage } from 'redux/post-form/types';
import './style.scss';

export type NewPostImageProps = {
  image: PostFormImage;
  onEdit: (ig: PostFormImage) => void;
};

function NewPostImage({
  image,
  onEdit,
  dispatchRemoveImage,
}: NewPostImageProps & MappedProps) {
  console.log('new post image', image);

  const handleRemoveClick = useCallback(() => {
    dispatchRemoveImage(image.id);
  }, [dispatchRemoveImage, image.id]);

  const handleEditClick = useCallback(() => {
    onEdit(image);
  }, [onEdit, image]);

  return (
    <div className="post-image">
      <Image
        src={image.croppedBlob ? image.croppedBlob : image.originalBlob}
        alt="new post image"
        useCdn={false}
        className="w-100 rounded"
      />
      <div className="post-image-icons">
        <Icon name={IconNameEnum.REMOVE_CIRCLE} onClick={handleRemoveClick} />
        <Icon name={IconNameEnum.IMAGE_EDIT} onClick={handleEditClick} />
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  dispatchRemoveImage: PostFormActions.deleteImage,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NewPostImage) as React.ElementType;
