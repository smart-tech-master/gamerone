import React from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';

export interface GearCardProps {
  gears: any[];
}

const GearCard: React.FC<GearCardProps> = ({
  gears,
}: GearCardProps): JSX.Element => {
  const gearItems =
    gears != null &&
    gears.map((g: any, index: any) => {
      return (
        <div key={index}>
          {g} + {index}
        </div>
      );
    });

  return gears && gears.length > 0 ? (
    <Card type={CardTypeEnum.GEAR}>
      {/* Interim: Manually added flex and justifyContent style not part of official design */}
      <div
        className="card__content"
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {gearItems}
      </div>
    </Card>
  ) : (
    <Card type={CardTypeEnum.GEAR}>
      <div className="card__content empty">
        <p>No gear yet.</p>
      </div>
    </Card>
  );
};

export default GearCard;
