/**
 * Gamer One API Documentation
 * Welcome to the Official Gamer One API documentation.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: developer@gamerone.gg
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface User {
  /**
   * ID for the user.
   */
  id: number;
  /**
   * Email for the current user, null if the requester is not the owner of user
   */
  email: string | null;
  /**
   * First name for the user. Can be null based on privacy
   */
  firstName: string | null;
  /**
   * Last name for the user can be null based on privacy
   */
  lastName: string | null;
  /**
   * Location for the user
   */
  location: string | null;
  /**
   * Main and unique identifier for the user.
   */
  username: string;
  /**
   * File path for the user avatar object.
   */
  avatar: string | null;
  /**
   * File path for the cover object.
   */
  banner: string | null;
  /**
   * Date of birth for the user.
   */
  birthDate: string | null;
  /**
   * Status of the user.
   */
  status: string | null;
  /**
   * Total number of followers user has.
   */
  followerCount: number;
  /**
   * Total number of users that this user follows.
   */
  followCount: number;
  /**
   * Total number of badges earned.
   */
  badgeCount: number;
  /**
   * Total games added to the users profile
   */
  gameCount: number;
  /**
   * Total number of hours games played & logged to gamerone.
   */
  playCount: number;
  /**
   * True if the request owner user is following this user.
   */
  isFollowing: boolean;
  /**
   * User bio information
   */
  bio: string | null;
  /**
   * User website 'http://site.com'
   */
  websiteUrl: string | null;
}