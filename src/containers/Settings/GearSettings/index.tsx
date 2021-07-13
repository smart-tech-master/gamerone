import React, { useState } from 'react';
import Card from 'components/common/Card';
import InputSearch from 'components/common/Form/InputSearch';
import Input from 'components/common/Form/Input';
import { useForm } from 'react-hook-form';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { Game } from 'interfaces';
import { searchGame } from 'api/game';
import ListItemGame from 'components/common/ListItemGame';

function GearForm() {
  const { register, errors, handleSubmit, setValue, clearError } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const [searchedGame, setSearchedGame] = useState<Game | undefined>(undefined);
  const [gameSearchResults, setGameSearchResults] = useState<Game[]>([]);

  const validateInputtedGame = (inputtedGame: string): boolean | string => {
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
    console.log('onSubmit', searchedGame, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputSearch<Game>
        name="game"
        label="Game"
        placeholder="Search Game"
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
      <Input
        name="test"
        label="Test Field"
        placeholder="This is a test field"
      />

      <Button scheme={ButtonSchemeEnum.PRIMARY}>Save</Button>
    </form>
  );
}

export default function GearSettings() {
  return (
    <Card>
      <div className="card__content">
        <h4>Gear</h4>
        <GearForm />
      </div>
    </Card>
  );
}
