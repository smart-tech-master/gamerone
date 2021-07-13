import request from 'utils/request';
import {
  ClubType,
  ExperienceType,
  GameCategory,
  GamePlatform,
  UserType,
} from 'interfaces';

const API_PATH = '/ref-data';
const OPTIONS = {
  method: 'GET',
};

/**
 * Returns a list of club types reference data
 */
export const clubTypes = () => {
  return request<ClubType[]>(API_PATH + '/club-types', OPTIONS);
};

/**
 * Returns a list of experience types reference data
 */
export const experienceTypes = () => {
  return request<ExperienceType[]>(API_PATH + '/experience-types', OPTIONS);
};

/**
 * Returns a list of game categories reference data
 */
export const gameCategories = () => {
  return request<GameCategory[]>(API_PATH + '/game-categories', OPTIONS);
};

/**
 * Returns a list of game platforms reference data
 */
export const gamePlatforms = () => {
  return request<GamePlatform[]>(API_PATH + '/game-platforms', OPTIONS);
};

/**
 * Returns a list of gear types reference data
 */
// export const gearTypes = () => {
//   return request(API_PATH + '/gear-types', OPTIONS).then((result: GearType[]) => result);
// };

/**
 * Returns a list of job types reference data
 */
// export const jobTypes = () => {
//   return request(API_PATH + '/job-types', OPTIONS).then((result: JobType[]) => result);
// };

/**
 * Returns a list of user types reference data
 */
export const userTypes = () => {
  return request<UserType[]>(API_PATH + '/user-types', OPTIONS);
};
