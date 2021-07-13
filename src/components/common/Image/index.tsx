import React from 'react';
import { CDN_URL } from '../../../utils/constants';

export type ImageDimensionType = 16 | 32 | 64 | 128 | 256 | 512;

export enum ImageDimensionEnum {
  D_16 = 16,
  D_32 = 32,
  D_64 = 64,
  D_128 = 128,
  D_256 = 256,
  D_512 = 512,
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  smartCrop?: boolean;
  useCdn?: boolean;
  width?: ImageDimensionType | number;
  height?: ImageDimensionType | number;
}

const Image: React.FC<ImageProps> = ({
  alt,
  useCdn = true,
  smartCrop = false,
  width = ImageDimensionEnum.D_128,
  height = ImageDimensionEnum.D_128,
  ...props
}: ImageProps): JSX.Element => {
  const { src, ...restProps } = props;
  let cdn = '';
  if (useCdn) {
    cdn += CDN_URL + '/' + width;
    if (height) {
      cdn += 'x' + height;
    }
    if (smartCrop) {
      cdn += ',sc';
    }
  }
  const imgSrc = cdn + src;
  return (
    <img src={imgSrc} alt={alt} width={width} height={height} {...restProps} />
  );
};

export default Image;
