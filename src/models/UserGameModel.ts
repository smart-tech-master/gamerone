import { UserGame } from 'interfaces';
import { GameModel } from './GameModel';
import { GamePlatformModel } from './GamePlatformModel';

export class UserGameModel implements UserGame {
  id = 0;
  region = '';
  gamertag = '';
  game = new GameModel();
  platform = new GamePlatformModel();

  fromDto = (game: UserGame) => {
    this.id = game.id;
    this.region = game.region;
    this.gamertag = game.gamertag;
    this.game = new GameModel().fromDto(game.game);
    this.platform = new GamePlatformModel().fromDto(game.platform);
    return this;
  };
}
