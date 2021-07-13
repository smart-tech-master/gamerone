import React from 'react';
import { Sponsor } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import Image from 'components/common/Image';

export interface SponsorsCardProps {
  sponsors: Sponsor[];
  isOwner: boolean;
  handleClickEdit?: () => void;
}

const SponsorsCard: React.FC<SponsorsCardProps> = ({
  sponsors,
  isOwner = false,
  handleClickEdit,
}: SponsorsCardProps): JSX.Element => {
  const sponsorItems =
    sponsors != null &&
    sponsors.map((s: Sponsor, index: any) => {
      return (
        <div key={index}>
          <a
            href={s.link || '#'}
            target={'_blank'}
            rel={'nofollow noopener noreferrer'}
          >
            <Image src={'/' + s.image} alt={s.name} />
          </a>
        </div>
      );
    });

  return (
    <Card
      type={CardTypeEnum.SPONSORS}
      isOwner={isOwner}
      onEdit={handleClickEdit}
    >
      {sponsors && sponsors.length > 0 ? (
        <div
          className="card__content"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          {sponsorItems}
        </div>
      ) : (
        <div className="card__content empty">
          <p>No sponsors yet.</p>
        </div>
      )}
    </Card>
  );
};

export default SponsorsCard;
