/**
 * @constant {String[]} vexdb.constant.endpoints
 * An Array of all valid endpoints
 */
let endpoints = [
  "events",
  "teams",
  "matches",
  "rankings",
  "season_rankings",
  "awards",
  "skills"
];

/**
 * @constant {Object<String[]>} vexdb.constant.validParams
 * For each endpoint, an array of parameters which vexdb will accept
 */
const validParams = {
  events: [
    "sku",
    "program",
    "date",
    "season",
    "city",
    "region",
    "country",
    "status",
    "limit_number",
    "limit_start",
    "nodata"
  ],
  teams: [
    "team",
    "program",
    "organisation",
    "city",
    "region",
    "country",
    "grade",
    "is_registered",
    "sku",
    "limit_number",
    "limit_start",
    "nodata"
  ],
  matches: [
    "sku",
    "division",
    "team",
    "round",
    "instance",
    "matchnum",
    "scheduled",
    "field",
    "scored",
    "season",
    "limit_number",
    "limit_start",
    "nodata"
  ],
  rankings: [
    "sku",
    "division",
    "team",
    "rank",
    "season",
    "limit_number",
    "limit_start",
    "nodata"
  ],
  season_rankings: [
    "program",
    "season",
    "team",
    "vrating_rank",
    "limit_number",
    "limit_start",
    "nodata"
  ],
  awards: [
    "sku",
    "name",
    "team",
    "season",
    "limit_number",
    "limit_start",
    "nodata"
  ],
  skills: [
    "sku",
    "program",
    "type",
    "team",
    "season",
    "rank",
    "season_rank",
    "limit_number",
    "limit_start",
    "nodata"
  ]
};

const uniques = {
  events: "sku",
  teams: "team"
};

/**
 * @constant {Function} vexdb.constant.isBrowser
 * A function to determine if the evaluating context is a browser. Used to identify caching and in isomorphic-fetching
 */
const isBrowser = new Function(
  "try { return this === window; } catch(e) { return false }"
);

/**
 * @var {Object<Object>} vexdb.constant.settings
 * Settings storage
 */
let settings = {
  cache: {
    ttl: 4 * 60 * 1000,
  },
  headers: {
    "User-Agent": "vexdb (nodejs)"
  },
  params: {},
  baseURL: "https://api.vexdb.io/v1/",
  live: {
    pollTime: 10 * 1000
  }
};

// Empty default headers in the browser, it can lead to CORS troubles
if (isBrowser()) settings.headers = {};

/**
 * Sets default headers to be applied to every request
 * @param {Object} headers Headers to set
 * @example
 * vexdb.constant.header({
 *  "User-Agent": "Bot"
 * })
 */
function header(headers) {
  if (isBrowser()) console.warn("Setting headers will prevent requests from made, due to the same origin policy. It is not reccomended");
  Object.assign(settings.headers, headers);
}

/**
 * Sets default params to be applied to every request
 * @param {Object} params Params to set
 * @example
 * vexdb.constant.param({
 *  season: "current",
 *  region: ["South Carolina", "California"]
 * })
 */
function param(params) {
  Object.assign(settings.params, params);
}

module.exports = {
  endpoints,
  validParams,
  settings,
  header,
  param,
  isBrowser,
  uniques
};
