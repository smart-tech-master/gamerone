import React, { useState, useCallback } from 'react';

import Button, { ButtonSchemeEnum } from 'components/common/Button';

import ModalWrapper from 'components/common/Modal/ModalWrapper';
import { Game } from 'interfaces';

import './style.scss';
import SearchGame from 'containers/Search/SearchGame';

interface DiscoverGamesProps {
  discoverLimit?: number;
  initGames: Game[];
  show: boolean;
  onFinish: (games: Game[]) => void;
  onCancel: () => void;
}
function DiscoverGames({
  show = false,
  onCancel,
  onFinish,
  initGames,
  discoverLimit = 3,
}: DiscoverGamesProps) {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [message, setMessage] = useState<string | null>(null); // TODO: Figure out the needs to limit the number of taggable games

  const handleFinish = () => {
    if (discoverLimit && selectedGames.length > discoverLimit) return;

    onFinish(selectedGames);
  };

  const handleGameAdded = useCallback(
    (game: Game) => {
      if (!discoverLimit || selectedGames.length < discoverLimit)
        setSelectedGames([...selectedGames, game]);
      else if (discoverLimit && selectedGames.length >= discoverLimit) {
        setMessage(`You can tag up to ${discoverLimit} games.`);
      }
    },
    [selectedGames, discoverLimit],
  );

  const handleGameRemoved = useCallback(
    (game: Game) => {
      console.log('removing game', game);
      setSelectedGames(selectedGames.filter((g) => g.id !== game.id));
      if (message) {
        setMessage(null);
      }
    },
    [selectedGames, message],
  );

  return (
    <ModalWrapper width={600} show={show} onBackdropClick={onCancel}>
      <div className="modal__header">
        <h4>Discover Games</h4>
      </div>
      <div className="modal__content">
        <SearchGame
          multiple
          navigate={false}
          clearInput={false}
          className="discover-block"
          onAdd={handleGameAdded}
          onRemove={handleGameRemoved}
          limit={discoverLimit}
          initGames={initGames}
        />
        {message && <span>{message}</span>}
      </div>
      <div className="modal__actions">
        <Button
          type="button"
          scheme={ButtonSchemeEnum.PRIMARY}
          onClick={handleFinish}
        >
          Finish
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </ModalWrapper>
  );
}

export default React.memo(DiscoverGames);
