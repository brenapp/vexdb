const { validParams, settings, isBrowser } = require("./constants");

/**
 * Saves current to its long term storage location (either localStorage, or the cache file)
 */
function save() {
    return new Promise((resolve, reject) => {
        if (isBrowser()) {
            for (const item in current) {
                if (current.hasOwnProperty(item)) {
                    localStorage[`vexdb_${item}`] = current[item]
                }
            }
            resolve();
        } else {
            try {
                const fs = require("fs");
                function saveToDisk() {
                    let old = {};
                    try { old = require(settings.cache.file) } catch (e) { }; // Reset the cache if there's ever a problem
                    for (const item in current) {
                        if (current.hasOwnProperty(item)) {
                            old[item] = current[item]
                        }
                    }
                    fs.writeFile(settings.cache.file, JSON.stringify(old), err => err ? reject(err) : resolve())
                }
                fs.access(settings.cache.file, err => err ?
                    fs.writeFile(settings.cache.file, "{}", saveToDisk) :
                    saveToDisk()
                )
            } catch (e) {
                reject(e);
            }
        }
    });
}


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
        .filter(key => validParams[endpoint].includes(key) && (typeof params[key] === "string" || typeof params[key] === "number")) // Prevents non-existant key causing duplication
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

    let sizeURL = sanitize(endpoint, Object.assign({}, params, { nodata: true }));
    current[sizeURL] = JSON.stringify({ expiry, value: { status: value.status, size: value.size, result: [] } });
    current[url] = JSON.stringify({ expiry, value });
    save();

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
 * @default {}
 */
let current = {}
cache.getCurrent = function () {
    return current;
}

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
    return current = {};
}

cache.resolve = function resolve(endpoint, params) {
    let cutoff = Date.now() + cache.ttl,
        url = sanitize(endpoint, params),
        value = current[url];

    return value && JSON.parse(value).expiry < cutoff ?
        JSON.parse(value).value :
        (delete current[url], undefined);

}

cache.has = function has(endpoint, params) {
    return cache.resolve(endpoint, params) !== undefined;
}

cache.serialize = serialize;
cache.save = save;

module.exports = cache;