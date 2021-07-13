import {
  SocialNetwork,
  Sponsor,
  UserExperience,
  Product,
  CurrentlyPlaying,
} from 'interfaces';

export const SOCIAL_NETWORK_DEMO_DATA: SocialNetwork[] = [
  {
    id: 1,
    name: 'Discord',
    url: 'https://discordapp.com/',
    ordinal: 1,
    image: 'social_networks/discord.svg',
    value: null,
  },
  {
    id: 2,
    name: 'Facebook',
    url: 'https://facebook.com/',
    ordinal: 2,
    image: 'social_networks/facebook.svg',
    value: 'NinjaTB',
  },
  {
    id: 3,
    name: 'Instagram',
    url: 'https://instagram.com/',
    ordinal: 3,
    image: 'social_networks/instagram.svg',
    value: 'ninja',
  },
  {
    id: 4,
    name: 'Mixer',
    url: 'https://mixer.com/',
    ordinal: 4,
    image: 'social_networks/mixer.svg',
    value: 'ninja',
  },
  {
    id: 5,
    name: 'Reddit',
    url: 'https://reddit.com/',
    ordinal: 5,
    image: 'social_networks/reddit.svg',
    value: null,
  },
  {
    id: 6,
    name: 'Snapchat',
    url: 'https://snapchat.com/',
    ordinal: 5,
    image: 'social_networks/snapchat.svg',
    value: null,
  },
  {
    id: 7,
    name: 'TikTok',
    url: 'https://tiktok.com/',
    ordinal: 6,
    image: 'social_networks/tiktok.svg',
    value: null,
  },
  {
    id: 8,
    name: 'Twitch',
    url: 'https://twitch.tv/',
    ordinal: 7,
    image: 'social_networks/twitch.svg',
    value: null,
  },
  {
    id: 9,
    name: 'Twitter',
    url: 'https://twitter.com/',
    ordinal: 8,
    image: 'social_networks/twitter.svg',
    value: 'ninja',
  },
  {
    id: 10,
    name: 'YouTube',
    url: 'https://youtube.com/',
    ordinal: 9,
    image: 'social_networks/youtube.svg',
    value: 'ninja',
  },
];

export const CURRENTLY_PLAYING_DEMO_DATA: CurrentlyPlaying = {
  game: {
    id: 2,
    name: 'Call of Duty: Modern Warfare',
    cover: 'games/call_of_duty_modern_warfare.jpg',
    logo: null,
    playerCount: 0,
  },
  online: true,
  onlineAt: [
    {
      id: 8,
      name: 'Twitch',
      url: 'https://twitch.tv/',
      ordinal: 7,
      image: 'social_networks/twitch.svg',
      value: null,
    },
  ],
  userId: 1,
  stoppedAt: new Date(),
  createdAt: new Date(),
};

export const SPONSOR_DEMO_DATA: Sponsor[] = [
  {
    id: 1,
    name: 'Monster Energy',
    image: '',
    ordinal: 0,
    link: 'https://',
  },
  {
    id: 2,
    name: 'SAP',
    image: '',
    ordinal: 1,
    link: 'https://',
  },
  {
    id: 3,
    name: 'Honda',
    image: '',
    ordinal: 1,
    link: 'https://',
  },
  {
    id: 4,
    name: 'Twitch',
    image: '',
    ordinal: 1,
    link: 'https://',
  },
  {
    id: 5,
    name: 'Hyper X',
    image: '',
    ordinal: 1,
    link: 'https://',
  },
];

export const EXPERIENCE_DEMO_DATA: UserExperience[] = [
  {
    id: 0,
    title: 'Halo Player',
    companyName: 'Luminosity Gaming',
    startDate: '2017-01-01',
    endDate: '2017-07-01',
    achievements:
      'Aliquam tempus mauris quis ex dictum posuere. Etiam interdum, tellus at dictum feugiat, sem dui finibus ipsum, at luctus nisi elit id mauris. Curabitur ut scelerisque diam.',
    game: {
      id: 0,
      name: 'string',
      cover: 'string',
      logo: 'string',
      playerCount: 0,
    },
    type: {
      id: 0,
      name: 'Professional',
      education: false,
      ordinal: 0,
    },
    club: null,
  },
  {
    id: 1,
    title: 'Halo Player',
    companyName: 'Evil Geniuses',
    startDate: '2016-08-01',
    endDate: '2016-11-01',
    achievements:
      'Nam semper odio in lacus accumsan, nec laoreet nunc venenatis. Pellentesque sit amet massa tristique lectus mollis accumsan non mattis velit.',
    game: {
      id: 0,
      name: 'string',
      cover: 'string',
      logo: 'string',
      playerCount: 0,
    },
    type: {
      id: 0,
      name: 'Professional',
      education: false,
      ordinal: 0,
    },
    club: null,
  },
  {
    id: 2,
    title: 'Halo Player',
    companyName: 'Team Liquid',
    startDate: '2015-05-01',
    endDate: '2016-01-01',
    achievements:
      'Integer vitae condimentum risus. Nullam finibus, risus a eleifend rhoncus, erat velit suscipit ante, quis tempus sapien elit eget justo. Cras eget dolor sed mi sodales imperdiet quis id neque.',
    game: {
      id: 0,
      name: 'string',
      cover: 'string',
      logo: 'string',
      playerCount: 0,
    },
    type: {
      id: 0,
      name: 'Professional',
      education: false,
      ordinal: 0,
    },
    club: null,
  },
  {
    id: 3,
    title: 'Halo Player',
    companyName: 'Cloud9',
    startDate: '2014-11-01',
    endDate: '2015-03-01',
    achievements:
      'Mauris sed odio non nisi bibendum sollicitudin sed ut ex. Aenean dignissim sapien non tempus sollicitudin. Pellentesque volutpat, lorem vitae.',
    game: {
      id: 0,
      name: 'string',
      cover: 'string',
      logo: 'string',
      playerCount: 0,
    },
    type: {
      id: 0,
      name: 'Professional',
      education: false,
      ordinal: 0,
    },
    club: null,
  },
  {
    id: 4,
    title: 'High School',
    companyName: 'Blazer5 Gaming',
    startDate: '2009-11-01',
    endDate: '2013-03-01',
    achievements:
      'Mauris sed odio non nisi bibendum sollicitudin sed ut ex. Aenean dignissim sapien non tempus sollicitudin. Pellentesque volutpat, lorem vitae.',
    game: {
      id: 0,
      name: 'string',
      cover: 'string',
      logo: 'string',
      playerCount: 0,
    },
    type: {
      id: 0,
      name: 'High School',
      education: true,
      ordinal: 0,
    },
    club: null,
  },
];

export const GEAR_DEMO_DATA: any[] = [
  {
    id: 0,
    name: 'Alienware AW2518H',
    type: {
      id: 1,
      name: 'Monitor',
      ordinal: 1,
    },
  },
  {
    id: 1,
    name: 'EVGA GeForce RTX 2080 Ti',
    type: {
      id: 7,
      name: 'GPU',
      ordinal: 1,
    },
  },
  {
    id: 2,
    name: 'FinalMouse Air58 Ninja CBR Edition',
    type: {
      id: 2,
      name: 'Mouse',
      ordinal: 2,
    },
  },
  {
    id: 4,
    name: 'HyperX FURY S Pro SE X-Large',
    type: {
      id: 3,
      name: 'Mousepad',
      ordinal: 1,
    },
  },
  {
    id: 5,
    name: 'Ducky One 2 Mini RGB',
    type: {
      id: 4,
      name: 'Keyboard',
      ordinal: 4,
    },
  },
  {
    id: 6,
    name: 'Beyerdynamic DT 990 Pro',
    type: {
      id: 5,
      name: 'Headset',
      ordinal: 5,
    },
  },
];

export const STORE_DEMO_DATA: Product[] = [
  {
    id: 1,
    name: 'LIQUID x MARVEL BLACK WIDOW SS CROP TEE',
    image: 'dev_demo_content/store-demo-1.jpg',
    ordinal: 0,
    link:
      'https://store.teamliquid.com/products/liquid-x-marvel-black-widow-ss-crop-tee',
  },
  {
    id: 2,
    name: 'LIQUID X MARVEL BLACK WIDOW JERSEY',
    image: 'dev_demo_content/store-demo-2.jpg',
    ordinal: 1,
    link:
      'https://store.teamliquid.com/products/liquid-x-marvel-black-widow-jersey',
  },
  {
    id: 3,
    name: 'LIQUID X MARVEL BLACK WIDOW HOODIE',
    image: 'dev_demo_content/store-demo-3.jpg',
    ordinal: 2,
    link:
      'https://store.teamliquid.com/products/liquid-x-marvel-black-widow-hoodie',
  },
];
