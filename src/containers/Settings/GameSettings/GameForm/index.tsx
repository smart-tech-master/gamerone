import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import Input, { SelectOption } from 'components/common/Form/Input';
import InputSearch from 'components/common/Form/InputSearch';
import ListItemGame from 'components/common/ListItemGame';

import { Game, GameAddRequest, UserGame, GameUpdateRequest } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import {
  selectCreateGameStatus,
  selectUpdateGameStatus,
  selectDeleteGameStatus,
} from 'redux/request-status/selectors';
import { searchGame } from 'api/game';

import './style.scss';

interface GameFormProps {
  show: boolean;
  usergame: UserGame | null;
  gamePlatformOptions: SelectOption[];
  onCancel: () => void;
}

function GameForm({
  usergame,
  show = false,
  onCancel,
  gamePlatformOptions,
}: GameFormProps) {
  const gameAddStatus = useSelector(selectCreateGameStatus);
  const gameUpdateStatus = useSelector(selectUpdateGameStatus);
  const gameDeleteStatus = useSelector(selectDeleteGameStatus);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
    setValue,
    clearError,
  } = useForm();
  const { dirty } = formState;

  // const [isAddInfo, setIsAddInfo] = useState(false);

  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
    if (usergame) return true;

    const matchedGame = gameSearchResults.find(
      (game) => game.name === inputtedGame,
    );

    if (matchedGame && matchedGame.id !== searchedGame?.id) {
      setSearchedGame(matchedGame);
    }

    return matchedGame !== undefined || 'Invalid';
  };

  const renderGameItem = (game: Game, hideResults: () => void) => (
    <ListItemGame
      key={game.id}
      game={game}
      onClick={() => {
        setValue('game', game.name);
        if (errors['game']) clearError('game');

        hideResults();
        setSearchedGame(game);
      }}
    />
  );

  // useEffect(() => {
  //   if (searchedGame) {
  //     setIsAddInfo(true);
  //   }
  // }, [searchedGame]);

  const onCancelModal = useCallback(() => {
    // setIsAddInfo(false);
    setSearchedGame(undefined);
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (
      (!gameUpdateStatus?.isFetching && !gameUpdateStatus?.isError) ||
      (!gameDeleteStatus?.isFetching && !gameDeleteStatus?.isError)
    )
      onCancelModal();
  }, [gameUpdateStatus, gameDeleteStatus, onCancelModal]);

  useEffect(() => {
    if (!gameAddStatus?.isFetching && !gameAddStatus?.isError) {
      onCancelModal();
    }
  }, [gameAddStatus, onCancelModal]);

  useEffect(() => {
    if (usergame) {
      const formData = {
        game: usergame.game.name,
        gamerTag: usergame.gamertag,
        platform: usergame.platform.id.toString(),
        region: usergame.region,
      };
      setSearchedGame(usergame.game);
      reset(formData);
    } else {
      const formData = {
        game: '',
        gamerTag: '',
        platform: '0',
        region: '',
      };
      reset(formData);
    }
  }, [usergame, reset]);

  const onSubmit = async (data: Record<string, any>) => {
    if (usergame) {
      dispatch(
        SettingsActions.updateUserGame(
          {
            gameId: searchedGame?.id,
            gamePlatformId: data.platform,
            gamertag: data.gamerTag,
            region: data.region,
          } as GameUpdateRequest,
          usergame.id,
        ),
      );
      return;
    }

    dispatch(
      SettingsActions.createUserGame({
        gameId: searchedGame?.id,
        gamePlatformId: data.platform,
        gamertag: data.gamerTag,
        region: data.region,
      } as GameAddRequest),
    );
  };

  const onDeleteUserGame = () => {
    if (usergame) dispatch(SettingsActions.deleteUserGame(usergame.id));
  };

  return (
    <ModalWrapper width={600} show={show} onBackdropClick={onCancelModal}>
      <div className="modal__header">
        <h4>{usergame ? usergame.game.name : 'Add Game'}</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal__content">
          <InputSearch<Game>
            name="game"
            label="Game"
            placeholder="Search ..."
            register={register}
            validateOptions={{
              required: usergame ? false : true,
              validate: validateInputtedGame,
            }}
            error={errors['game']}
            api={searchGame}
            renderItem={renderGameItem}
            onSearchFinish={setGameSearchResults}
            disabled={usergame !== null}
          />
          {/* {usergame && (
            <div className="py-20">
              <Avatar
                src={usergame.game.cover}
                alt={usergame.game.name || 'name of a game'}
                size={'lg'}
              />
            </div>
          )} */}
          <Input
            name="gamerTag"
            label="Gamer Tag"
            inputRef={register({
              required: true,
              minLength: 3,
              maxLength: 100,
            })}
            maxLength={100}
            error={errors['gamerTag']}
          />

          <Input
            type="select"
            name="platform"
            label="Platform"
            selectRef={register}
            selectOptions={gamePlatformOptions}
            selectInitValue={usergame ? usergame.platform.id.toString() : ''}
          />

          <Input
            name="region"
            label="Region"
            inputRef={register({
              required: false,
              minLength: 2,
              maxLength: 100,
            })}
            maxLength={100}
            error={errors['region']}
          />
        </div>
        <div className="modal__actions">
          <Button
            disabled={!dirty}
            scheme={ButtonSchemeEnum.PRIMARY}
            submitting={gameAddStatus?.isFetching}
          >
            {usergame ? 'Update' : 'Finish'}
          </Button>
          {usergame && (
            <Button
              type="button"
              onClick={onDeleteUserGame}
              submitting={gameDeleteStatus?.isFetching}
            >
              Delete
            </Button>
          )}
          <Button type="button" onClick={onCancelModal}>
            Cancel
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default React.memo(GameForm);
