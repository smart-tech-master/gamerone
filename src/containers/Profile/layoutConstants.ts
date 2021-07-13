/**
 * breakpoints and number of columns for each screen size
 * desktop: 5
 * tablet: 3
 * mobile: 1
 */

export const PROFILE_LAYOUT_BREAKPOINTS = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
};
export const PROFILE_LAYOUT_COLUMNS = { lg: 5, md: 3, sm: 3, xs: 1 };

// initial layouts for react-grid-layout (desktop, tablet, mobile)
export const PROFILE_LAYOUT_DEFAULT = {
  lg: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 3, h: 1, static: true },
    { i: 'block-sponsors', x: 2, y: 1, w: 3, h: 1, minW: 2, minH: 1, maxH: 1 },
    { i: 'block-achievements', x: 1, y: 4, w: 1, h: 1, minH: 1, maxH: 1 },
    {
      i: 'block-latest-post',
      x: 0,
      y: 2,
      w: 3,
      h: 2,
      minW: 2,
      minH: 2,
      maxH: 2,
    },
    { i: 'block-gears', x: 2, y: 4, w: 2, h: 1, minW: 2, minH: 1, maxH: 1 },
    {
      i: 'block-social-networks',
      x: 0,
      y: 4,
      w: 1,
      h: 2,
      minW: 1,
      minH: 2,
      maxH: 2,
    },
    { i: 'block-timeline', x: 1, y: 6, w: 3, h: 2, minW: 2, minH: 2, maxH: 2 },
    { i: 'block-now-playing', x: 3, y: 2, w: 2, h: 2, minH: 2, maxH: 2 },
    { i: 'block-store', x: 4, y: 4, w: 1, h: 2, minH: 2, maxH: 2 },
  ],
  md: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 1, h: 3, static: true },
    { i: 'block-sponsors', x: 0, y: 2, w: 3, h: 1, minW: 2, minH: 1, maxH: 1 },
    { i: 'block-achievements', x: 0, y: 3, w: 1, h: 2, minH: 2, maxH: 2 },
    {
      i: 'block-latest-post',
      x: 1,
      y: 3,
      w: 2,
      h: 2,
      minW: 2,
      minH: 2,
      maxH: 2,
    },
    { i: 'block-gears', x: 0, y: 5, w: 3, h: 1, minW: 2, minH: 1, maxH: 1 },
    { i: 'block-social-networks', x: 0, y: 8, w: 1, h: 2, minH: 2, maxH: 2 },
    { i: 'block-timeline', x: 0, y: 6, w: 3, h: 2, minW: 2, minH: 2, maxH: 2 },
    { i: 'block-now-playing', x: 1, y: 8, w: 2, h: 2, minH: 2, maxH: 2 },
    { i: 'block-store', x: 4, y: 6, w: 1, h: 2, minH: 2, maxH: 2 },
  ],
  sm: [
    { i: 'block-user', x: 0, y: 0, w: 3, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 3, h: 1, static: true },
    { i: 'block-sponsors', x: 0, y: 3, w: 3, h: 1, minW: 2, minH: 1, maxH: 1 },
    { i: 'block-achievements', x: 0, y: 4, w: 1, h: 2, minH: 2, maxH: 2 },
    {
      i: 'block-latest-post',
      x: 1,
      y: 4,
      w: 2,
      h: 2,
      minW: 2,
      minH: 2,
      maxH: 2,
    },
    { i: 'block-gears', x: 0, y: 6, w: 3, h: 1, minW: 2, minH: 1, maxH: 1 },
    { i: 'block-social-networks', x: 0, y: 9, w: 1, h: 2, minH: 2, maxH: 2 },
    { i: 'block-timeline', x: 0, y: 7, w: 3, h: 2, minW: 2, minH: 2, maxH: 2 },
    { i: 'block-now-playing', x: 1, y: 9, w: 2, h: 2, minH: 2, maxH: 2 },
  ],
  xs: [
    { i: 'block-user', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 1, h: 1, static: true },
    { i: 'block-sponsors', x: 0, y: 4, w: 1, h: 1, minH: 1, maxH: 1 },
    { i: 'block-achievements', x: 0, y: 4, w: 1, h: 2, minH: 2, maxH: 2 },
    {
      i: 'block-latest-post',
      x: 0,
      y: 6,
      w: 1,
      h: 2,
      minW: 2,
      minH: 2,
      maxH: 2,
    },
    { i: 'block-gears', x: 0, y: 8, w: 1, h: 1, minH: 1, maxH: 1 },
    { i: 'block-social-networks', x: 0, y: 9, w: 1, h: 1, minH: 1, maxH: 1 },
    { i: 'block-timeline', x: 0, y: 10, w: 1, h: 2, minH: 2, maxH: 2 },
    { i: 'block-now-playing', x: 0, y: 12, w: 1, h: 2, minH: 2, maxH: 2 },
  ],
};

export const PROFILE_ACHIEVEMENTS = {
  lg: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 3, h: 1, static: true },
  ],
  md: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 1, h: 3, static: true },
  ],
  sm: [
    { i: 'block-user', x: 0, y: 0, w: 3, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 3, h: 1, static: true },
  ],
  xs: [
    { i: 'block-user', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 1, h: 1, static: true },
  ],
};

export const PROFILE_EXPERIENCE = {
  lg: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 3, h: 1, static: true },
    { i: 'block-experience-1', x: 2, y: 1, w: 2, h: 2 },
    { i: 'block-experience-2', x: 0, y: 2, w: 2, h: 2 },
    { i: 'block-experience-3', x: 2, y: 2, w: 2, h: 2 },
  ],
  md: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 1, h: 3, static: true },
    { i: 'block-experience-1', x: 2, y: 1, w: 3, h: 1, minW: 2 },
    { i: 'block-experience-2', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-experience-3', x: 3, y: 2, w: 2, h: 2, minW: 2 },
  ],
  sm: [
    { i: 'block-user', x: 0, y: 0, w: 3, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 3, h: 1, static: true },
    { i: 'block-experience-1', x: 2, y: 1, w: 3, h: 1, minW: 2 },
    { i: 'block-experience-2', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-experience-3', x: 3, y: 2, w: 2, h: 2, minW: 2 },
  ],
  xs: [
    { i: 'block-user', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 1, h: 1, static: true },
    { i: 'block-experience-1', x: 2, y: 1, w: 3, h: 1, minW: 2 },
    { i: 'block-experience-2', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-experience-3', x: 3, y: 2, w: 2, h: 2, minW: 2 },
  ],
};

export const PROFILE_GAMES = {
  lg: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 3, h: 1, static: true },
    { i: 'block-game-1', x: 2, y: 1, w: 1, h: 2 },
    { i: 'block-game-2', x: 3, y: 1, w: 1, h: 2 },
    { i: 'block-game-3', x: 4, y: 1, w: 1, h: 2 },
    { i: 'block-game-4', x: 0, y: 2, w: 1, h: 2 },
    { i: 'block-game-5', x: 1, y: 2, w: 1, h: 2 },
    { i: 'block-game-6', x: 2, y: 2, w: 1, h: 2 },
    { i: 'block-game-7', x: 3, y: 2, w: 1, h: 2 },
    { i: 'block-game-8', x: 4, y: 2, w: 1, h: 2 },
  ],
  md: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 1, h: 3, static: true },
    { i: 'block-game-1', x: 2, y: 1, w: 1, h: 1 },
    { i: 'block-game-2', x: 3, y: 1, w: 1, h: 1 },
    { i: 'block-game-3', x: 4, y: 1, w: 1, h: 1 },
    { i: 'block-game-4', x: 0, y: 2, w: 1, h: 1 },
    { i: 'block-game-5', x: 1, y: 2, w: 1, h: 1 },
    { i: 'block-game-6', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-game-7', x: 3, y: 2, w: 1, h: 1 },
    { i: 'block-game-8', x: 4, y: 2, w: 1, h: 2 },
  ],
  sm: [
    { i: 'block-user', x: 0, y: 0, w: 3, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 3, h: 1, static: true },
    { i: 'block-game-1', x: 2, y: 1, w: 1, h: 1 },
    { i: 'block-game-2', x: 3, y: 1, w: 1, h: 1 },
    { i: 'block-game-3', x: 4, y: 1, w: 1, h: 1 },
    { i: 'block-game-4', x: 0, y: 2, w: 1, h: 1 },
    { i: 'block-game-5', x: 1, y: 2, w: 1, h: 1 },
    { i: 'block-game-6', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-game-7', x: 3, y: 2, w: 1, h: 1 },
    { i: 'block-game-8', x: 4, y: 2, w: 1, h: 2 },
  ],
  xs: [
    { i: 'block-user', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 1, h: 1, static: true },
    { i: 'block-game-1', x: 2, y: 1, w: 1, h: 1 },
    { i: 'block-game-2', x: 3, y: 1, w: 1, h: 1 },
    { i: 'block-game-3', x: 4, y: 1, w: 1, h: 1 },
    { i: 'block-game-4', x: 0, y: 2, w: 1, h: 1 },
    { i: 'block-game-5', x: 1, y: 2, w: 1, h: 1 },
    { i: 'block-game-6', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-game-7', x: 3, y: 2, w: 1, h: 1 },
    { i: 'block-game-8', x: 4, y: 2, w: 1, h: 2 },
  ],
};

export const PROFILE_GEAR = {
  lg: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 3, h: 1, static: true },
    { i: 'block-gear-1', x: 2, y: 1, w: 1, h: 1 },
    { i: 'block-gear-2', x: 3, y: 1, w: 1, h: 1 },
    { i: 'block-gear-3', x: 4, y: 1, w: 1, h: 1 },
    { i: 'block-gear-4', x: 0, y: 2, w: 1, h: 1 },
    { i: 'block-gear-5', x: 1, y: 2, w: 1, h: 1 },
    { i: 'block-gear-6', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-gear-7', x: 3, y: 2, w: 1, h: 1 },
  ],
  md: [
    { i: 'block-user', x: 0, y: 0, w: 2, h: 2, static: true },
    { i: 'block-nav', x: 2, y: 0, w: 1, h: 3, static: true },
    { i: 'block-gear-1', x: 2, y: 1, w: 1, h: 1 },
    { i: 'block-gear-2', x: 3, y: 1, w: 1, h: 1 },
    { i: 'block-gear-3', x: 4, y: 1, w: 1, h: 1 },
    { i: 'block-gear-4', x: 0, y: 2, w: 1, h: 1 },
    { i: 'block-gear-5', x: 1, y: 2, w: 1, h: 1 },
    { i: 'block-gear-6', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-gear-7', x: 3, y: 2, w: 1, h: 1 },
  ],
  sm: [
    { i: 'block-user', x: 0, y: 0, w: 3, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 3, h: 1, static: true },
    { i: 'block-gear-1', x: 2, y: 1, w: 1, h: 1 },
    { i: 'block-gear-2', x: 3, y: 1, w: 1, h: 1 },
    { i: 'block-gear-3', x: 4, y: 1, w: 1, h: 1 },
    { i: 'block-gear-4', x: 0, y: 2, w: 1, h: 1 },
    { i: 'block-gear-5', x: 1, y: 2, w: 1, h: 1 },
    { i: 'block-gear-6', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-gear-7', x: 3, y: 2, w: 1, h: 1 },
  ],
  xs: [
    { i: 'block-user', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'block-nav', x: 0, y: 2, w: 1, h: 1, static: true },
    { i: 'block-gear-1', x: 2, y: 1, w: 1, h: 1 },
    { i: 'block-gear-2', x: 3, y: 1, w: 1, h: 1 },
    { i: 'block-gear-3', x: 4, y: 1, w: 1, h: 1 },
    { i: 'block-gear-4', x: 0, y: 2, w: 1, h: 1 },
    { i: 'block-gear-5', x: 1, y: 2, w: 1, h: 1 },
    { i: 'block-gear-6', x: 2, y: 2, w: 1, h: 1 },
    { i: 'block-gear-7', x: 3, y: 2, w: 1, h: 1 },
  ],
};
