/**
 * validParams - Valid Parameters, by endpoint
 * @type {Object}
 * @const
 */
const validParams = (function () {
    let loc = ["city", "region", "country"],
        limit = ["limit_number", "limit_start", "nodata"],
        event = ["sku", "division", "team"];

    return {
        events: ["sku", "program", "date", "season", ...loc, "status", ...limit],
        teams: ["team", "program", "organisation", ...loc, "grade", "is_registered", "sku", ...limit],
        matches: [...event, "round", "instance", "matchnum", "scheduled", "field", "scored", "season", ...limit],
        rankings: [...event, "rank", "season", ...limit],
        season_rankings: ["program", "season", "team", "vrating_rank", ...limit],
        awards: ["sku", "name", "team", "season", ...limit],
        skills: ["sku", "program", "type", "team", "season", "rank", "season_rank", ...limit]
    }
    
})();
/**
 * Serializes an object into URL parameters
 * @param {String<URL>} url Add a url to preface
 * @param {Object} params The params to serialize
 */
function serialize(url, params) {
    let str = "";
    for (var p in params) {
        if (params.hasOwnProperty(p)) {
            if (str !== "") str += "&"
            str += `${p}=${encodeURIComponent(params[p])}`
        }
    }

    return `${url}?${str}`
}


/**
 * Converts and endpoint and params into the appropriate cache URL
 * @param {String<endpoint>} endpoint 
 * @param {Object} params
 */
function sanitize(endpoint, params) {
    return serialize(endpoint, Object.keys(params)
        .filter(key => validParams[endpoint].includes(key)) // Prevents non-existant key causing duplication
        .sort() // Prevents order causing duplication
        .reduce(
            (obj, key) =>
                (obj[key] = params[key], obj),
            {})
    );
}

function cache(endpoint, params, value) {
    let url = sanitize(endpoint, params),
        expiry = Date.now() + cache.ttl;

    // Set the nodata flag to prevent information duplication
    let sizeURL = sanitize(endpoint, Object.assign({}, params, { nodata: true }));
    cache.current[sizeURL] = JSON.stringify({ expiry, value: { status: value.status, size: value.size, result: [] } });
    cache.current[url] = JSON.stringify({ expiry, value });

    return value;
}

/**
 * The cache Time-To-Live, in milliseconds. To set the TTL, use `cache.setTTL()`. Defaults to `240000`, or 4 minutes
 * @type {Number}
 * @default 240000
 */
cache.ttl = 4 * 60 * 1000;

/**
 * The cache object, mainly for debugging. Use `cache.has()` or `.cache()` to manipulate. Defaults to an empty object, i.e. no cache
 * @type {Object}
 * @default {  }
 */
cache.current = typeof localStorage !== "undefined" ? localStorage : {}

/**
 * Set the Time-To-Live for all upcoming caches. Note that this does not affect old caches, their TTL will still be the same
 * @method cache.setTTL
 * @param  {Number} ttl The Time-To-Live, in milliseconds. Set to 0 for no caching
 * @return {Object}     Cache
 */
cache.setTTL = function setTTL(ttl) {
    cache.ttl = ttl;
    return cache;
}

/**
 * Resets the cache, deletes all entries
 * @method clear
 * @return {Object} The reset cache
 */
cache.clear = function clear() {
    return cache.current = {};
}

cache.resolve = function resolve(endpoint, params) {
    let cutoff = Date.now() + cache.ttl,
        url = sanitize(endpoint, params),
        value = cache.current[url];

    return value && JSON.parse(value).expiry < cutoff ?
        JSON.parse(value).value :
        (delete cache.current[url], undefined);

}

cache.has = function has(endpoint, params) {
    return cache.resolve(endpoint, params) !== undefined;
}


module.exports = cache;