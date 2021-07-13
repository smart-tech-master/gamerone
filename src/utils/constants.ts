export const FETCH_DEFAULT_OPTIONS = {
  supportHeaderParams: true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

export const API_HOST = process.env.REACT_APP_API_ENDPOINT
  ? process.env.REACT_APP_API_ENDPOINT
  : 'API_ENV_NOT_DEFINED';

export const CDN_URL = process.env.REACT_APP_CDN_URL
  ? process.env.REACT_APP_CDN_URL
  : 'CDN_ENV_NOT_DEFINED';

// eslint-disable-next-line no-useless-escape
export const CHECK_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const CHECK_PASSWORD_REGEX = /^(?=[^A-Z]*[A-Z])(?=(?:[^a-z]*[a-z]))(?=(?:[^0-9]*[0-9]))(?=(?:[^!?@*#&$.]*[!?@*#&$.])).{8,}$/;

// Image placeholders
export const AVATAR_PLACEHOLDER = 'assets/placeholder/avatar.svg';
export const BANNER_PLACEHOLDER = 'assets/placeholder/banner.svg';
export const GAME_PLACEHOLDER = 'assets/placholder/game.svg';
export const POST_PLACEHOLDER = 'assets/placeholder/post.svg';

export const BANNER_WIDTH = 1600; //px
export const BANNER_HEIGHT = 400; //px

export const AVATAR_WIDTH = 512; //px
export const AVATAR_HEIGHT = 512; //px

export const POST_WIDTH = 640; //px
export const POST_HEIGHT = 360; //px
export const POST_IMAGE_LIMIT = 6;

export const TOASTIFY_SETTINGS = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
