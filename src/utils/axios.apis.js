/**
 * Endpoints for users
 * @typedef {Object} USERS_ENDPOINT
 * @property {Object} GET_ALL - Get all users
 * @property {string} GET_ALL.METHOD - HTTP method
 * @property {string} GET_ALL.URL - URL string
 * @property {Object} GET_ONE - Get one user by id
 * @property {string} GET_ONE.METHOD - HTTP method
 * @property {function(id: string): string} GET_ONE.URL - URL string with id parameter
 */
export const USERS_ENDPOINT = {
  GET_ALL: {
    METHOD: "GET",
    URL: "users",
  },
  GET_ONE: {
    METHOD: "GET",
    URL: (id) => `users/${id}`,
  },
};

/**
 * Endpoints for plans
 * @typedef {Object} PLANS_ENDPOINT
 * @property {Object} GET_ALL - Get all plans
 * @property {string} GET_ALL.METHOD - HTTP method
 * @property {string} GET_ALL.URL - URL string
 * @property {Object} GET_ONE - Get one plan by id
 * @property {string} GET_ONE.METHOD - HTTP method
 * @property {function(id: string): string} GET_ONE.URL - URL string with id parameter
 */
export const PLANS_ENDPOINT = {
  GET_ALL: {
    METHOD: "GET",
    URL: "plans",
  },
};

/**
 * Endpoints for plans requests
 * @typedef {Object} PLANS_REQUEST_ENDPOINT
 * @property {Object} GET_ALL - Get all plans requests
 * @property {string} GET_ALL.METHOD - HTTP method
 * @property {string} GET_ALL.URL - URL string
 * @property {Object} GET_ONE - Get one plans request by id
 * @property {string} GET_ONE.METHOD - HTTP method
 * @property {function(id: string): string} GET_ONE.URL - URL string with id parameter
 */
export const PLANS_REQUEST_ENDPOINT = {
  GET_ALL: {
    METHOD: "GET",
    URL: "plan-request",
  },
  GET_ONE: {
    METHOD: "GET",
    URL: (id) => `plan-request/${id}`,
  },
};

export const SONGS_ENDPOINT = {
  GET_ALL: {
    METHOD: "GET",
    URL: "songs",
  },
  CREATE: {
    METHOD: "POST",
    URL: "songs",
  },
  DELETE: {
    METHOD: "POST",
    URL: "songs",
  },
  GET_ONE: {
    METHOD: "GET",
    URL: (id) => `songs/${id}`,
  },
};
export const PLAYLIST_ENDPOINT = {
  GET_ALL: {
    METHOD: "GET",
    URL: "playlist",
  },
  CREATE: {
    METHOD: "POST",
    URL: "playlist",
  },
  DELETE: {
    METHOD: "POST",
    URL: "playlist",
  },
  GET_ONE: {
    METHOD: "GET",
    URL: `/playlist`,
  },
};

export const BANNERS_ENDPOINT = {
  GET_ALL: {
    METHOD: "GET",
    URL: "banners",
  },
  CREATE: {
    METHOD: "POST",
    URL: "banners",
  },
  GET_ONE: {
    METHOD: "GET",
    URL: `/banners`,
  },
  DELETE: {
    METHOD: "GET",
    URL: `/banners`,
  },
};

export const AUTH_ENDPOINT = {
  LOGIN: {
    METHOD: "POST",
    URL: "login",
  },
};
