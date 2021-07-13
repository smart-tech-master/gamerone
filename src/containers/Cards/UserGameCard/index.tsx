import React from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import { UserGame } from 'interfaces';
import { CDN_URL } from 'utils/constants';
import './style.scss';

export interface UserGameCardProps {
  usergame: UserGame;
}

const UserGameCard: React.FC<UserGameCardProps> = ({
  usergame,
}: UserGameCardProps): JSX.Element => {
  return (
    <Card type={CardTypeEnum.GAME} key={usergame.id}>
      <div
        className="card__content"
        style={{
          backgroundImage: `url(${CDN_URL + '/260/' + usergame.game.cover})`,
        }}
      >
        <h4>{usergame.game.name}</h4>
        <h5>{usergame.platform.name}</h5>
      </div>
    </Card>
  );
};

export default UserGameCard;
