import React from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import './style.scss';
import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';
import { CurrentlyPlaying } from 'interfaces';
import { CDN_URL } from 'utils/constants';
import Icon, { IconNameEnum } from 'components/common/Icon';

export interface NowPlayingCardProps {
  playing: CurrentlyPlaying;
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const NowPlayingCard: React.FC<NowPlayingCardProps> = ({
  playing,
  isOwner = false,
  handleClickEdit,
}: NowPlayingCardProps): JSX.Element => {
  const handleClick = (url: string, value: string | null) => {
    window.open(`${url}${value}`, '_blank');
  };

  const game = (
    <div className="now-playing-game">
      <div className="footer">
        <div className="details">
          <p>Currently Playing</p>
          <h3>{playing.game?.name}</h3>
        </div>
        <div className="watch">
          {playing.onlineAt &&
            playing.onlineAt.map((social) => {
              return (
                <Button
                  key={social.id}
                  type="button"
                  scheme={ButtonSchemeEnum.SQUARE}
                  schemes={[ButtonSchemeEnum.PRIMARY]}
                  size={ButtonSizeEnum.LARGE}
                  disabled={!playing.online}
                  onClick={() => handleClick(social.url, social.value)}
                >
                  {social.name === 'Twitch' && (
                    <Icon name={IconNameEnum.SOCIAL_TWITCH} />
                  )}
                  {social.name === 'YouTube' && (
                    <Icon name={IconNameEnum.SOCIAL_YOUTUBE} />
                  )}
                  {social.name === 'Mixer' && (
                    <Icon name={IconNameEnum.SOCIAL_MIXER} />
                  )}
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );

  return (
    <Card
      type={CardTypeEnum.NOW_PLAYING}
      isOwner={isOwner}
      onEdit={handleClickEdit}
      style={{
        backgroundImage: `url(${
          CDN_URL + '/552x400,sc/' + playing.game?.cover
        })`,
      }}
    >
      {playing.game != null ? (
        game
      ) : (
        <div className="card__content empty">
          <p>Not playing yet.</p>
        </div>
      )}
    </Card>
  );
};

export default NowPlayingCard;
