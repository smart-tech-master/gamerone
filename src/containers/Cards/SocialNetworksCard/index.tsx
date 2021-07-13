import React from 'react';
import { SocialNetwork } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import Icon, { IconNameEnum } from 'components/common/Icon';
import './style.scss';

export interface SocialNetworksCardProps {
  networks?: SocialNetwork[];
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const SocialNetworksCard: React.FC<SocialNetworksCardProps> = ({
  networks,
  isOwner = false,
  handleClickEdit,
}: SocialNetworksCardProps): JSX.Element => {
  // const getSocialIcon = (name: string) => {
  //   return <Icon name={IconNameEnum.SOCIAL_TWITCH} />;
  // };

  const socialAccounts =
    networks != null &&
    networks
      .filter((network) => network.value !== null)
      .map((network, index) => {
        return (
          <a
            key={index}
            href={network.url + network.value}
            target={'_blank'}
            rel={'nofollow noopener noreferrer'}
          >
            <div className="social-icon">
              {network.name.toLowerCase() === 'facebook' && (
                <Icon name={IconNameEnum.SOCIAL_FACEBOOK} />
              )}
              {network.name.toLowerCase() === 'instagram' && (
                <Icon name={IconNameEnum.SOCIAL_INSTAGRAM} />
              )}
              {network.name.toLowerCase() === 'reddit' && (
                <Icon name={IconNameEnum.SOCIAL_REDDIT} />
              )}
              {network.name.toLowerCase() === 'snapchat' && (
                <Icon name={IconNameEnum.SOCIAL_SNAPCHAT} />
              )}
              {network.name.toLowerCase() === 'twitch' && (
                <Icon name={IconNameEnum.SOCIAL_TWITCH} />
              )}
              {network.name.toLowerCase() === 'twitter' && (
                <Icon name={IconNameEnum.SOCIAL_TWITTER} />
              )}
              {network.name.toLowerCase() === 'weibo' && (
                <Icon name={IconNameEnum.SOCIAL_WEIBO} />
              )}
              {network.name.toLowerCase() === 'vk' && (
                <Icon name={IconNameEnum.SOCIAL_VK} />
              )}
              {network.name.toLowerCase() === 'youtube' && (
                <Icon name={IconNameEnum.SOCIAL_YOUTUBE} />
              )}
            </div>
          </a>
        );
      });

  return (
    <Card type={CardTypeEnum.SOCIAL} isOwner={isOwner} onEdit={handleClickEdit}>
      {socialAccounts && socialAccounts.length > 0 ? (
        <div className="card__content">
          <h4>Social</h4>
          <div className="social-networks">{socialAccounts}</div>
        </div>
      ) : (
        <div className="card__content empty">
          <p>No social networks yet.</p>
        </div>
      )}
    </Card>
  );
};

export default SocialNetworksCard;
