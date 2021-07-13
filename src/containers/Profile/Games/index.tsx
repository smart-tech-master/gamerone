import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from 'components/layout/Grid';
import PageLoading from 'components/common/PageLoading';

import { LOAD_PAGE_REQUEST } from 'redux/profile/types';
import ProfileActions from 'redux/profile/actions';
import { selectGames } from 'redux/profile/selectors';
import { selectStatus } from 'redux/request-status/selectors';
import { selectCurrentProfileUser } from 'redux/profile/selectors';
import UserGameCard from 'containers/Cards/UserGameCard';

const Games: React.FC = (): JSX.Element => {
  const user = useSelector(selectCurrentProfileUser);
  const pagedGames = useSelector(selectGames);
  const gamesStatus = useSelector(selectStatus).get(
    LOAD_PAGE_REQUEST + '/games',
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.id) dispatch(ProfileActions.loadInitialPage('games'));
  }, [user, dispatch]);

  return (
    <Grid startPos={2} onProfile={true}>
      {gamesStatus?.isFetching && !pagedGames && <PageLoading show={true} />}
      {!gamesStatus?.isFetching && pagedGames.length === 0 && <h3>No Games</h3>}
      {pagedGames.map((usergame) => {
        return <UserGameCard key={usergame.id} usergame={usergame} />;
      })}
    </Grid>
  );
};

export default Games;
