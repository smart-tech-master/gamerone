import React from 'react';
import { Achievement } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import ListItem from 'components/common/ListItem';

export interface AchievementsCardProps {
  achievements: Achievement[];
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({
  achievements,
}: AchievementsCardProps): JSX.Element => {
  const achievementItems =
    achievements != null &&
    achievements.map((a: Achievement) => {
      return <ListItem key={a.id} image={a.badge.logo} title={a.badge.name} />;
    });

  return achievements && achievements.length > 0 ? (
    <Card type={CardTypeEnum.ACHIEVEMENTS}>
      <div className="card__content">{achievementItems}</div>
    </Card>
  ) : (
    <Card type={CardTypeEnum.ACHIEVEMENTS}>
      <div className="card__content empty">
        <p>No achievements yet.</p>
      </div>
    </Card>
  );
};

export default AchievementsCard;
