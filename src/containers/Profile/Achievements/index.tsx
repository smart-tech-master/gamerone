import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentProfileUser } from 'redux/profile/selectors';
import { RootState } from 'redux/types';
import { Achievement } from 'interfaces';
import usePromise from 'lib/usePromise';
import { getProfileAchievementsById } from 'api/achievements';
import { UserModel } from 'models/user';
import Card from 'components/common/Card';
import Grid from 'components/layout/Grid';
import Image from 'components/common/Image';
import PageLoading from 'components/common/PageLoading';

export interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
}: AchievementCardProps): JSX.Element => {
  let altValue = 'image';
  if (achievement.badge.logo) {
    altValue = achievement.badge.name;
  }

  return (
    <Card key={achievement.id}>
      <div className="card__content">
        <Image src={achievement.badge.logo} alt={altValue} title={altValue} />
        {achievement.badge.name}
        {achievement.badge.description}
      </div>
    </Card>
  );
};

const Achievements: React.FC<MappedProps> = ({
  user,
}: MappedProps): JSX.Element => {
  const [isLoading, achievements, error] = usePromise<Achievement[]>(
    () => getProfileAchievementsById(user.id),
    [user],
  );
  const achievementCards =
    achievements &&
    achievements.map((achievement: Achievement, index) => {
      return <AchievementCard key={index} achievement={achievement} />;
    });

  return (
    <Grid startPos={2} onProfile={true}>
      {achievementCards && achievementCards.length > 0 ? (
        { achievementCards }
      ) : (
        <>
          {isLoading && <PageLoading show={true} />}
          {!isLoading && !error && <h3>No Achievements</h3>}
        </>
      )}
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectCurrentProfileUser(state) || new UserModel(),
  };
};

type MappedProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Achievements);
