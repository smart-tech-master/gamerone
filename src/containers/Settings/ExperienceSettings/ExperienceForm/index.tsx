import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import Input from 'components/common/Form/Input';
import InputSearch from 'components/common/Form/InputSearch';
import ListItemGame from 'components/common/ListItemGame';

import {
  Game,
  Club,
  UserExperience,
  UserExperienceAddRequest,
} from 'interfaces';
import SettingsActions from 'redux/settings/actions';

import { searchGame } from 'api/game';

import './style.scss';
import {
  selectAddExperienceStatus,
  selectDeleteExperienceStatus,
  selectUpdateExperienceStatus,
} from 'redux/request-status/selectors';
import DatePickerInput from 'components/common/Form/DatePickerInput';
import { DropdownOptionType } from 'components/common/Dropdown';
import ListItemClub from 'components/common/ListItemClub';
import { searchProfile } from 'api/profile';

interface ExperienceFormProps {
  show: boolean;
  experience: UserExperience | null;
  experienceTypeOptions: DropdownOptionType[];
  onCancel: () => void;
}

function ExperienceForm({
  show = false,
  onCancel,
  experience,
  experienceTypeOptions,
}: ExperienceFormProps) {
  const createStatus = useSelector(selectAddExperienceStatus);
  const deleteStatus = useSelector(selectDeleteExperienceStatus);
  const updateStatus = useSelector(selectUpdateExperienceStatus);

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

  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);

  const [searchedClub, setSearchedClub] = useState<Club | undefined>(undefined);
  const [clubSearchResults, setClubSearchResults] = useState<Club[]>([]);

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
    if (experience?.game) return true;
    if (inputtedGame === '') return true;

    const matchedGame = gameSearchResults.find(
      (game) => game.name === inputtedGame,
    );

    if (matchedGame && matchedGame.id !== searchedGame?.id) {
      setSearchedGame(matchedGame);
    }

    return matchedGame !== undefined || 'Invalid';
  };

  const validateInputtedClub = (inputtedClub: string): boolean | string => {
    if (experience?.club) return true;
    if (inputtedClub === '') return true; // Check ref if it is required
    const matchedClub = clubSearchResults.find(
      (club) => club.name === inputtedClub,
    );

    if (matchedClub && matchedClub.id !== searchedGame?.id) {
      setSearchedClub(matchedClub);
    }

    return matchedClub !== undefined || 'Invalid';
  };

  const onCancelModal = useCallback(() => {
    setSearchedGame(undefined);
    setSearchedClub(undefined);
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (experience) {
      const formData = {
        experienceTypeId: experience.type.id,
        title: experience.title,
        game: experience?.game?.name,
        club: experience?.club?.name,
        startDate: experience.startDate,
        endDate: experience?.endDate,
        companyName: experience?.companyName,
        achievements: experience?.achievements,
      };
      reset(formData);
    } else {
      const formData = {
        experienceTypeId: '',
        title: '',
        game: '',
        club: '',
        companyName: '',
        achievements: '',
      };
      reset(formData);
    }
  }, [experience, reset]);

  const onSubmit = async (
    data: Record<string, any>,
    id: number | undefined,
  ) => {
    if (id) {
      dispatch(
        SettingsActions.updateExperience(
          {
            experienceTypeId: data?.experienceTypeId,
            title: data?.title,
            gameId: searchedGame?.id,
            clubId: searchedClub?.id,
            startDate: data?.startDate,
            endDate: data?.endDate,
            companyName: data?.companyName,
            achievements: data?.achievements,
          } as UserExperienceAddRequest,
          id,
        ),
      );
    } else {
      // create experience
      dispatch(
        SettingsActions.createExperience({
          experienceTypeId: data?.experienceTypeId,
          title: data?.title,
          gameId: searchedGame?.id,
          clubId: searchedClub?.id,
          startDate: data?.startDate,
          endDate: data?.endDate,
          companyName: data?.companyName,
          achievements: data?.achievements,
        } as UserExperienceAddRequest),
      );
    }
  };

  const onDeleteExperience = () => {
    if (experience) {
      dispatch(SettingsActions.deleteExperience(experience.id));
    }
  };

  // clean after submission
  // after successful form submit or delete a store, hide the form
  useEffect(() => {
    if (
      (!createStatus?.isFetching && !createStatus?.isError) ||
      (!updateStatus?.isFetching && !updateStatus?.isError) ||
      (!deleteStatus?.isFetching && !deleteStatus?.isError)
    ) {
      onCancelModal();
    }
  }, [createStatus, updateStatus, deleteStatus, onCancelModal]);

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

  const renderClubItem = (club: Club, hideResults: () => void) => (
    <ListItemClub
      key={club.id}
      club={club}
      onClick={() => {
        setValue('clubId', club.id);
        if (errors['game']) clearError('game');
        hideResults();
        setSearchedClub(club);
      }}
    />
  );

  return (
    <ModalWrapper width={600} show={show} onBackdropClick={onCancelModal}>
      <div className="modal__header">
        <h4>{experience ? experience.title : 'Add Game'}</h4>
      </div>
      <form onSubmit={handleSubmit((e) => onSubmit(e, experience?.id))}>
        <div className="modal__content">
          {experienceTypeOptions && experienceTypeOptions.length > 0 && (
            <Input
              type="select"
              name="experienceTypeId"
              label="Type"
              selectRef={register({ required: true })}
              selectOptions={experienceTypeOptions}
              selectInitValue={experience ? experience?.type?.name : ''}
              error={errors['experienceTypeId']}
            />
          )}
          <Input
            name="title"
            label="Title"
            inputRef={register({
              required: true,
              minLength: 2,
              maxLength: 100,
            })}
            minLength={2}
            maxLength={100}
            error={errors['title']}
          />
          <div style={{ display: 'flex' }}>
            <InputSearch<Club>
              name="club"
              label="Club"
              placeholder="Search Club"
              register={register}
              validateOptions={{
                required: false,
                validate: validateInputtedClub,
              }}
              error={errors['club']}
              renderItem={renderClubItem}
              api={searchProfile}
              onSearchFinish={setClubSearchResults}
            />
            <Input
              name="companyName"
              label="Company Name"
              inputRef={register({
                required: true,
              })}
              error={errors['companyName']}
            />
          </div>
          <InputSearch<Game>
            name="game"
            label="Game"
            placeholder="Search ..."
            error={errors['game']}
            api={searchGame}
            register={register}
            validateOptions={{
              required: false,
              validate: { validateInputtedGame },
            }}
            renderItem={renderGameItem}
            onSearchFinish={setGameSearchResults}
          />
          <div style={{ display: 'flex' }}>
            <DatePickerInput
              name="startDate"
              label="Start Date"
              inputRef={register({ required: true, minLength: 3 })}
              initValue={experience ? experience.startDate : ''}
              error={errors['startDate']}
            />
            <DatePickerInput
              name="endDate"
              label="End Date"
              inputRef={register}
              initValue={experience ? experience.endDate : ''}
              error={errors['endDate']}
            />
          </div>
          <Input
            type="textarea"
            name="achievements"
            label="Achievements"
            textareaRef={register}
          />
        </div>
        <div className="modal__actions">
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            disabled={!dirty}
            submitting={createStatus?.isFetching || updateStatus?.isFetching}
          >
            {experience ? 'Save the update' : 'Create an experience'}
          </Button>
          {experience && (
            <Button
              type="button"
              onClick={onDeleteExperience}
              submitting={deleteStatus?.isFetching}
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

export default React.memo(ExperienceForm);
