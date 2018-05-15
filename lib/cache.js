const { validParams, settings, isBrowser } = require("./constants");
const keya = require("../../keya");

/**
 * Serializes an object into URL parameters
 * @param {String<URL>} url Add a url to preface
 * @param {Object} params The params to serialize
 */
function serialize(url, params) {
  let str = "";
  for (var p in params) {
    if (params.hasOwnProperty(p)) {
      if (str !== "") str += "&";
      str += `${p}=${encodeURIComponent(params[p])}`;
    }
  }

  return `${url}?${str}`;
}

/**
 * Converts and endpoint and params into the appropriate cache URL
 * @param {String<endpoint>} endpoint
 * @param {Object} params
 */
function sanitize(endpoint, params) {
  return serialize(
    endpoint,
    Object.keys(params)
      .filter(
        key =>
          validParams[endpoint].includes(key) &&
          ["string", "number", "boolean"].includes(typeof params[key]) &&
          key == "limit_start"
            ? params[key] != 0
            : true
      ) // Prevents non-existant key causing duplication
      .sort() // Prevents order causing duplication
      .reduce((obj, key) => ((obj[key] = params[key]), obj), {})
  );
}

/**
 * Manually set a cache item. NOT RECCOMENDED
 * @param {String} endpoint
 * @param {Object} params Parameters object
 * @param {Object} value The result from the request
 */
async function cache(endpoint, params, value) {
  let file = "vexdb-" + sanitize(endpoint, params);
  return keya.set(file, {
    expiry: Date.now() + cache.ttl,
    value
  });
}

async function resolve(endpoint, params) {
  let file = "vexdb-" + sanitize(endpoint, params);
  if (await keya.has(file)) {
    let out = keya.get(file);
    if (out.expiry > Date.now()) {
      return out.value;
    } else {
      return keya.remove(file).then(() => undefined);
    }
  } else {
    return undefined;
  }
}

async function has(endpoint, params) {
  return (await resolve(endpoint, params)) !== undefined;
}

/**
 * The cache Time-To-Live, in milliseconds. To set the TTL, use `cache.setTTL()`. Defaults to `240000`, or 4 minutes
 * @type {Number}
 * @default 240000
 */
cache.ttl = 4 * 60 * 1000;

/**
 * Set the Time-To-Live for all upcoming caches. Note that this does not affect old caches, their TTL will still be the same
 * @method cache.setTTL
 * @param  {Number} ttl The Time-To-Live, in milliseconds. Set to 0 for no caching
 * @return {Object}     Cache
 */
function setTTL(ttl) {
  cache.ttl = ttl;
  return cache;
}

/**
 * Resets the cache, deletes all entries
 * @method clear
 * @return {Promise<Boolean>}
 */
async function clear() {
  let keys = Object.keys(await keya.all());
  keys.filter(s => s.startsWith("vexdb-")).forEach(k => keya.remove(k));
}

cache.resolve = resolve;
cache.has = has;
cache.clear = clear;
cache.setTTL = setTTL;
cache.serialize = serialize;
cache.sanitize = sanitize;

module.exports = cache;
