import React, { ReactNode } from 'react';
import ListItem from '../ListItem';
import { Game } from 'interfaces';
import { GAME_PLACEHOLDER } from 'utils/constants';

interface ListItemGameProps {
  game: Game;
  onClick?: (e?: any) => void;
  appendRight?: ReactNode;
}

const ListItemGame: React.FC<ListItemGameProps> = ({
  game,
  onClick,
  appendRight,
}: ListItemGameProps): JSX.Element => {
  return (
    <ListItem
      title={game.name}
      image={game.cover || GAME_PLACEHOLDER}
      onClick={onClick}
      appendRight={appendRight}
    />
  );
};

export default ListItemGame;
