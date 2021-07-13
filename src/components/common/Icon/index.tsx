import React from 'react';
import './style.scss';

type IconName =
  | 'icon-user-network'
  | 'icon-game-pacman'
  | 'icon-award-medal'
  | 'icon-keyboard'
  | 'icon-trophy-star'
  | 'icon-game-controller'
  | 'icon-image-edit'
  | 'icon-remove-circle'
  | 'icon-arrow-right-double'
  | 'icon-arrow-left'
  | 'icon-arrow-left-double'
  | 'icon-arrow-right'
  | 'icon-tv-flat-screen'
  | 'icon-social-media-facebook'
  | 'icon-social-media-instagram'
  | 'icon-social-media-vk'
  | 'icon-social-media-snapchat'
  | 'icon-social-media-reddit'
  | 'icon-social-media-weibo'
  | 'icon-social-media-youtube'
  | 'icon-social-media-twitter'
  | 'icon-social-media-twitch';

export enum IconNameEnum {
  USER_NETWORK = 'icon-user-network',
  GAME_PACMAN = 'icon-game-pacman',
  AWARD_MEDAL = 'icon-award-medal',
  KEYBOARD = 'icon-keyboard',
  TROPHY_STAR = 'icon-trophy-star',
  GAME_CONTROLLER = 'icon-game-controller',
  IMAGE_EDIT = 'icon-image-edit',
  REMOVE_CIRCLE = 'icon-remove-circle',
  ARROW_RIGHT_DOUBLE = 'icon-arrow-right-double',
  ARROW_LEFT = 'icon-arrow-left',
  ARROW_LEFT_DOUBLE = 'icon-arrow-left-double',
  ARROW_RIGHT = 'icon-arrow-right',
  TV_FLAT_SCREEN = 'icon-tv-flat-screen',
  SOCIAL_FACEBOOK = 'icon-social-media-facebook',
  SOCIAL_INSTAGRAM = 'icon-social-media-instagram',
  SOCIAL_VK = 'icon-social-media-vk',
  SOCIAL_SNAPCHAT = 'icon-social-media-snapchat',
  SOCIAL_REDDIT = 'icon-social-media-reddit',
  SOCIAL_WEIBO = 'icon-social-media-weibo',
  SOCIAL_YOUTUBE = 'icon-social-media-youtube',
  SOCIAL_TWITTER = 'icon-social-media-twitter',
  SOCIAL_TWITCH = 'icon-social-media-twitch',
  SOCIAL_MIXER = 'icon-social-media-twitch', // todo find mixer font
}

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }: IconProps) => {
  return <span className={name} {...props}></span>;
};

export default Icon;
