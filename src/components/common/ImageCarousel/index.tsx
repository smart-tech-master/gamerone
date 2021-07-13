import React from 'react';
import Carousel from 'nuka-carousel';

import Image from 'components/common/Image';

import { PostMedia } from 'interfaces';
import { POST_WIDTH, POST_HEIGHT } from 'utils/constants';

export type ImageCarouselProps = {
  images: PostMedia[];
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
}: ImageCarouselProps) => {
  const imageCarousel = images.map((media, index) => (
    <Image
      key={index}
      src={'/' + media.filename}
      alt={''}
      width={POST_WIDTH}
      height={POST_HEIGHT}
      useCdn={true}
      smartCrop={true}
    />
  ));

  return images.length > 0 ? (
    <div className="carousel">
      <Carousel autoplay={false}>{imageCarousel}</Carousel>
    </div>
  ) : (
    <> </>
  );
};

export default React.memo(ImageCarousel);
