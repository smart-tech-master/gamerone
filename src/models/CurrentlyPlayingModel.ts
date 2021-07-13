import { CurrentlyPlaying } from 'interfaces/currentlyPlaying';

export class CurrentlyPlayingModel implements CurrentlyPlaying {
  game = null;
  online = false;
  onlineAt = [];
  userId = 0;
  stoppedAt = new Date();
  createdAt = new Date();

  fromDto = (currentlyPlaying?: CurrentlyPlaying) => {
    Object.assign(this, currentlyPlaying);
    return this;
  };
}
