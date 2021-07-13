import {
  Profile,
  CurrentlyPlaying,
  SocialNetwork,
  Sponsor,
  Product,
  LayoutSettings,
  User,
} from 'interfaces';
import { UserModel, UserTypeModel } from './user';
import { CurrentlyPlayingModel } from './CurrentlyPlayingModel';
import { LayoutSettingsModel } from './LayoutSettingModel';

export class ProfileModel implements Profile {
  user: UserModel;
  networks: Array<SocialNetwork>;
  products: Array<Product>;
  sponsors: Array<Sponsor>;
  type: UserTypeModel;
  currentlyPlaying: CurrentlyPlaying;
  layout: LayoutSettings;

  constructor() {
    this.user = new UserModel();
    this.networks = [];
    this.products = [];
    this.sponsors = [];
    this.type = new UserTypeModel();
    this.currentlyPlaying = new CurrentlyPlayingModel();
    this.layout = new LayoutSettingsModel();
  }

  fromDto = (profile: Profile) => {
    this.user = new UserModel().fromDto(profile.user);
    this.networks = profile.networks.map((network: SocialNetwork) => network);
    this.products = profile.products.map((product: Product) => product);
    this.sponsors = profile.sponsors.map((sponsor: Sponsor) => sponsor);
    this.type = new UserTypeModel().fromDto(profile.type);
    this.currentlyPlaying = new CurrentlyPlayingModel().fromDto(
      profile.currentlyPlaying,
    );
    this.layout = new LayoutSettingsModel().fromDto(profile.layout);
    return this;
  };

  follow() {
    this.user.follow();
    return this;
  }

  followed() {
    this.user.followed();
    return this;
  }

  unfollow() {
    this.user.unfollow();
    return this;
  }

  unfollowed() {
    this.user.unfollowed();
    return this;
  }

  updateUser(user: User) {
    this.user = new UserModel().fromDto(user);
    return this;
  }

  updateLayoutSettings(layout: LayoutSettings) {
    this.layout = new LayoutSettingsModel().fromDto(layout);
    return this;
  }
}
