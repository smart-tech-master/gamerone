import { getToken } from './token';
import { API_HOST, FETCH_DEFAULT_OPTIONS } from './constants';
import { keysToCamel, keysToSnake } from './caseConversion';

import { HttpResponse } from 'interfaces';
export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response);
  error.response = response;

  throw error;
}

/**
 * Convert object keys to snake_case and stringify body
 *
 * @param {Object} body
 */
export function stringifyBody(body: any): string {
  const conversedBody = keysToSnake(body);

  return JSON.stringify(conversedBody);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request<T>(
  url: string,
  options?: RequestInit,
): Promise<HttpResponse<T> | { err: ResponseError }> {
  const newOptions = { ...FETCH_DEFAULT_OPTIONS, ...options };
  const token = getToken().get('idToken');

  if (token) {
    newOptions.headers = {
      ...newOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return fetch(API_HOST + url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(keysToCamel);
}

/**
 *  If the errors is formatted by the server, tranforms it to a JS object. Otherwise,
 *  pass the raw error.
 *  @param   {Object}  error
 *  @return  {Object}
function parseError(error) {
  let parsed;

  try {
    parsed = error.response.json();
  } catch (err) {
    parsed = error.response
      ? { status: error.response.status, message: error.response.statusText }
      : { name: error.name, message: error.message };
  }

  return parsed;
}

 */
