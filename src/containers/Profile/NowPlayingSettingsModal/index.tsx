import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalWrapper from 'components/common/Modal/ModalWrapper';
import { BANNER_WIDTH } from 'utils/constants';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import InputSearch from 'components/common/Form/InputSearch';
import Checkbox from 'components/common/Form/Checkbox';
import ListItemGame from 'components/common/ListItemGame';
import { searchGame } from 'api/game';

import { Game, SocialNetwork } from 'interfaces';
import {
  selectCurrentlyPlaying,
  selectProfileSocialNetworks,
} from 'redux/settings/selectors';
import SettingsActions from 'redux/settings/actions';
import { CurrentlyPlayingRequest } from 'interfaces/currentlyPlayingRequest';
import {
  selectUpdateCurrentlyPlayingStatus,
  selectDeleteCurrentlyPlayingStatus,
} from 'redux/request-status/selectors';

interface NowPlayingSettingsModalProps {
  visible?: boolean;
  onClose: () => void;
}

export default function NowPlayingSettingsModal({
  visible = false,
  onClose,
}: NowPlayingSettingsModalProps) {
  const socialsList = useSelector(selectProfileSocialNetworks);
  const currentlyPlayingGame = useSelector(selectCurrentlyPlaying);

  const statusCurrentlyPlayingUpdate = useSelector(
    selectUpdateCurrentlyPlayingStatus,
  );
  const statusCurrentlyPlayingDelete = useSelector(
    selectDeleteCurrentlyPlayingStatus,
  );

  const {
    register,
    errors,
    handleSubmit,
    setValue,
    clearError,
    reset,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // const { dirty } = formState;

  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);

  const [watchList, setWatchList] = useState<SocialNetwork[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const filterWatchList = socialsList.filter((social) => {
      if (
        (social.name === 'Mixer' ||
          social.name === 'Twitch' ||
          social.name === 'YouTube') &&
        social.value
      ) {
        return true;
      } else return false;
    });
    setWatchList(filterWatchList);
  }, [socialsList]);

  const isSocialOnCurrentlyPlayingGame = useCallback(
    (socialName: string) => {
      return (
        currentlyPlayingGame.onlineAt &&
        currentlyPlayingGame.onlineAt.some((social) => {
          return social.name === socialName;
        })
      );
    },
    [currentlyPlayingGame],
  );

  useEffect(() => {
    if (currentlyPlayingGame) {
      const formData = {
        game: currentlyPlayingGame.game?.name,
        Mixer: isSocialOnCurrentlyPlayingGame('Mixer'),
        Twitch: isSocialOnCurrentlyPlayingGame('Twitch'),
        YouTube: isSocialOnCurrentlyPlayingGame('YouTube'),
        online: currentlyPlayingGame.online,
      };
      setSearchedGame(
        currentlyPlayingGame.game ? currentlyPlayingGame.game : undefined,
      );
      reset(formData);
    } else {
      const formData = {
        game: '',
        Mixer: false,
        Twitch: false,
        YouTube: false,
        online: false,
      };
      reset(formData);
    }
  }, [currentlyPlayingGame, reset, isSocialOnCurrentlyPlayingGame]);

  useEffect(() => {
    if (
      (!statusCurrentlyPlayingUpdate?.isFetching &&
        !statusCurrentlyPlayingUpdate?.isError) ||
      (!statusCurrentlyPlayingDelete?.isFetching &&
        !statusCurrentlyPlayingDelete?.isError)
    ) {
      onClose();
    }
  }, [statusCurrentlyPlayingUpdate, statusCurrentlyPlayingDelete, onClose]);

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
    if (currentlyPlayingGame.game) return true;
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

  const onSubmit = (data: any) => {
    dispatch(
      SettingsActions.updateCurrentlyPlayingGame({
        gameId: searchedGame?.id,
        online: data.online,
        mixer: data.Mixer ? true : false,
        twitch: data.Twitch ? true : false,
        youtube: data.YouTube ? true : false,
      } as CurrentlyPlayingRequest),
    );
  };

  const onDeleteCurrentlyPlaying = () => {
    dispatch(SettingsActions.deleteCurrentlyPlayingGame());
  };

  return (
    <ModalWrapper
      show={visible}
      onBackdropClick={onClose}
      width={BANNER_WIDTH / 3}
    >
      <div className="modal__header">
        <h4>Now Playing</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal__content">
          <InputSearch<Game>
            name="game"
            label="Game"
            placeholder="Search ..."
            register={register}
            validateOptions={{
              required: true,
              validate: validateInputtedGame,
            }}
            error={errors['game']}
            api={searchGame}
            renderItem={renderGameItem}
            onSearchFinish={setGameSearchResults}
          />
          <div className="input-group">
            <label className="input-label">Watch Here</label>
            <div className="input-wrapper">
              {watchList.length
                ? watchList.map((social) => (
                    <Checkbox
                      key={social.id}
                      name={social.name}
                      label={social.name}
                      inputRef={register({ required: false })}
                    />
                  ))
                : 'You need to add Mixer, Twitch or YouTube social networks.'}
            </div>
          </div>
          <Checkbox
            name="online"
            label="Online"
            disabled={!watchList.length}
            inputRef={register({ required: false })}
          />
        </div>
        <div className="modal__actions">
          <Button type="button" onClick={onDeleteCurrentlyPlaying}>
            Delete
          </Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button scheme={ButtonSchemeEnum.PRIMARY}>Save</Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
