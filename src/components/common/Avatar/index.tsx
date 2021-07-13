import React from 'react';

import { AVATAR_PLACEHOLDER } from 'utils/constants';
import Image from '../Image';
import './style.scss';

export interface AvatarProps {
  id?: string;
  src?: string | null;
  alt: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  id = 'avatar',
  src = AVATAR_PLACEHOLDER,
  alt,
  title,
  size = 'md',
  className,
  ...props
}: AvatarProps): JSX.Element => {
  const avatarStyle = `badge badge--avatar ${size}`;
  const classes = className ? `${avatarStyle} ${className}` : avatarStyle;
  const avatarSrc =
    src !== null && !src.startsWith('blob:')
      ? '/' + src
      : src === null
      ? '/' + AVATAR_PLACEHOLDER
      : src;
  const useCdn = avatarSrc !== null && !avatarSrc.startsWith('blob:');

  return (
    <figure className={avatarStyle}>
      <Image
        id={id}
        src={avatarSrc}
        alt={alt}
        title={title}
        width={128}
        height={128}
        className={classes}
        useCdn={useCdn}
        {...props}
      />
    </figure>
  );
};

export default Avatar;
