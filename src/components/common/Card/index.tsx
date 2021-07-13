import React, { ReactNode } from 'react';
import './style.scss';

export type CardType =
  | 'user'
  | 'sponsors'
  | 'achievements'
  | 'post'
  | 'social'
  | 'gear'
  | 'now-playing'
  | 'history'
  | 'store'
  | 'game';

export enum CardTypeEnum {
  USER = 'user',
  SPONSORS = 'sponsors',
  ACHIEVEMENTS = 'achievements',
  POST = 'post',
  SOCIAL = 'social',
  GEAR = 'gear',
  NOW_PLAYING = 'now-playing',
  HISTORY = 'history',
  STORE = 'store',
  GAME = 'game',
}

export interface CardProps {
  type?: CardType;
  children?: ReactNode;
  isOwner?: boolean;
  onEdit?: () => void;
}

const Card: React.FC<CardProps & React.HTMLProps<HTMLDivElement>> = ({
  type,
  children,
  isOwner = false,
  onEdit,
  ...props
}: CardProps): JSX.Element => {
  let cardType = '';
  if (type != null) {
    cardType = ' card--' + type;
  }

  const handleClickEdit = () => {
    if (onEdit) onEdit();
  };

  return (
    <div className={'card' + cardType} {...props}>
      {children}
      {isOwner && (
        <>
          <div className="card__edit-corner" title="Edit this card's content">
            <button
              className="button button--square button--very-small button--flat-subtle"
              onClick={handleClickEdit}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5548 1.83594L11.6642 0.945312C11.383 0.664062 10.9845 0.5 10.6095 0.5C10.2345 0.5 9.83609 0.664062 9.55484 0.945312L1.2814 9.21875L1.00015 11.8906C0.953274 12.2188 1.21109 12.5 1.53921 12.5C1.56265 12.5 1.58609 12.5 1.60952 12.5L4.2814 12.2188L12.5548 3.94531C13.1408 3.35938 13.1408 2.42188 12.5548 1.83594ZM3.95327 11.4922L1.77359 11.7266L2.00796 9.54688L8.19546 3.35938L10.1408 5.30469L3.95327 11.4922ZM12.0158 3.42969L10.6564 4.78906L8.71109 2.84375L10.0705 1.48438C10.2111 1.34375 10.3986 1.25 10.6095 1.25C10.8205 1.25 11.008 1.34375 11.1486 1.48438L12.0158 2.35156C12.3205 2.65625 12.3205 3.125 12.0158 3.42969Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
