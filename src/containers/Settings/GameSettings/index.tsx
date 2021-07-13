import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'components/common/Card';
import Button from 'components/common/Button';
import { SelectOption } from 'components/common/Form/Input';
import ListItem from 'components/common/ListItem';
import PageLoading from 'components/common/PageLoading';

import { UserGame } from 'interfaces';
import { GAME_PLACEHOLDER } from 'utils/constants';
import { selectStatus } from 'redux/request-status/selectors';
import { LOAD_PAGE_REQUEST } from 'redux/settings/types';
import SettingsActions from 'redux/settings/actions';
import {
  selectSettingsGames,
  selectGamePlatforms,
} from 'redux/settings/selectors';
import { selectCurrentUser } from 'redux/auth/selectors';

import GameForm from './GameForm';
import './style.scss';

export default function GameSettings() {
  const user = useSelector(selectCurrentUser);
  const pagedGames = useSelector(selectSettingsGames);
  const gamePlatforms = useSelector(selectGamePlatforms);

  const gamesStatus = useSelector(selectStatus).get(
    LOAD_PAGE_REQUEST + '/games',
  );

  const [gamePlatformOptions, setGamePlatformOptions] = useState<
    SelectOption[]
  >([]);

  const [visibleDiscoverGames, showDiscoverGames] = useState(false);
  const [userGame, setUserGame] = useState<UserGame | null>(null);

  const handleCancelDiscover = useCallback(() => {
    showDiscoverGames(false);
    setUserGame(null);
  }, []);

  const dispatch = useDispatch();

  // Get GamePlatforms
  useEffect(() => {
    dispatch(SettingsActions.getGamePlatforms());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (gamePlatforms) {
      const mappedPlatforms: SelectOption[] = gamePlatforms.map((platform) => {
        return { value: platform.id, label: platform.name };
      });
      setGamePlatformOptions(mappedPlatforms);
    }
  }, [gamePlatforms]);

  // Get UserGame[], if user exists

  useEffect(() => {
    if (user.id) dispatch(SettingsActions.loadInitialPage('games'));
  }, [user, dispatch]);

  // if a Game is selected, will show the GameEditForm
  const onGameEdit = (usergame: UserGame | null) => {
    setUserGame(usergame);
    showDiscoverGames(true);
  };

  return (
    <Card>
      <div className="card__content">
        <h4>Games</h4>

        <div className="py-20">
          <Button type="button" onClick={() => onGameEdit(null)}>
            Add
          </Button>
        </div>

        <div>
          {gamesStatus?.isFetching && <PageLoading show={true} />}
          {pagedGames.map((usergame) => (
            <ListItem
              key={usergame.game.id}
              title={usergame.game.name}
              description={usergame.platform.name}
              image={
                usergame.game.cover ? usergame.game.cover : GAME_PLACEHOLDER
              }
              onClick={() => onGameEdit(usergame)}
            />
          ))}
        </div>

        <GameForm
          usergame={userGame as UserGame}
          show={visibleDiscoverGames}
          onCancel={handleCancelDiscover}
          gamePlatformOptions={gamePlatformOptions}
        />
      </div>
    </Card>
  );
}
