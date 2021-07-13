import React from 'react';
import Image from 'components/common/Image';
import { BANNER_PLACEHOLDER } from 'utils/constants';
import './style.scss';

export interface CoverImageProps {
  id?: string;
  src?: string | null;
  alt: string;
  title?: string;
  width: number;
  height: number;
}

const CoverImage: React.FC<CoverImageProps> = ({
  id = 'cover',
  src = BANNER_PLACEHOLDER,
  alt,
  title,
  ...props
}: CoverImageProps): JSX.Element => {
  const coverSrc =
    src !== null && !src.startsWith('blob:')
      ? '/' + src
      : src === null
      ? '/' + BANNER_PLACEHOLDER
      : src;
  const useCdn = coverSrc !== null && !coverSrc.startsWith('blob:');

  return (
    <Image
      id={id}
      src={coverSrc}
      alt={alt}
      title={title}
      useCdn={useCdn}
      {...props}
    />
  );
};

export default CoverImage;
