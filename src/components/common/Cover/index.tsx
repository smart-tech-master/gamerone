import React from 'react';

import {
  CDN_URL,
  BANNER_HEIGHT,
  BANNER_WIDTH,
  BANNER_PLACEHOLDER,
} from 'utils/constants';

export interface CoverProps {
  src?: string | null;
}

const Cover: React.FC<CoverProps> = ({
  src = BANNER_PLACEHOLDER,
}: CoverProps): JSX.Element => {
  const bannerUrl =
    src !== null && !src.startsWith('blob:')
      ? CDN_URL + `/${BANNER_WIDTH}x${BANNER_HEIGHT}/` + src
      : src === null
      ? BANNER_PLACEHOLDER
      : src;

  return (
    <section
      className="cover"
      style={{
        backgroundImage: `url(${bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
      }}
      aria-label="cover"
    />
  );
};

export default Cover;
