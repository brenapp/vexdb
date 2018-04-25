let endpoints = [
    "events",
    "teams",
    "matches",
    "rankings",
    "season_rankings",
    "awards",
    "skills"
];

const validParams = {
    events: ["sku", "program", "date", "season", "city", "region", "country", "status", "limit_number", "limit_start", "nodata"],
    teams: ["team", "program", "organisation", "city", "region", "country", "grade", "is_registered", "sku", "limit_number", "limit_start", "nodata"],
    matches: ["sku", "division", "team", "round", "instance", "matchnum", "scheduled", "field", "scored", "season", "limit_number", "limit_start", "nodata"],
    rankings: ["sku", "division", "team", "rank", "season", "limit_number", "limit_start", "nodata"],
    season_rankings: ["program", "season", "team", "vrating_rank", "limit_number", "limit_start", "nodata"],
    awards: ["sku", "name", "team", "season", "limit_number", "limit_start", "nodata"],
    skills: ["sku", "program", "type", "team", "season", "rank", "season_rank", "limit_number", "limit_start", "nodata"]
}

let settings = {
    "cache": {
        ttl: 4 * 60 * 1000
    },
    "headers": {
        "User-Agent": "vexdb (nodejs)"
    },
    "params": {

    },
    "baseURL": "https://api.vexdb.io/v1/"
}

/**
 * Sets default headers to be applied to every request
 * @param {Object} headers Headers to set
 * @example
 * vexdb.constant.header({
 *  "User-Agent": "Bot"
 * })
 */
function header(headers) {
    Object.assign(settings.headers, headers)
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
    Object.assign(settings.params, params)
}


module.exports = {
    endpoints,
    validParams,
    settings,
    header,
    param
}