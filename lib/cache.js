/**
 * Since VexDB updates every 4 minutes, it can oftentimes be wasteful to send the same request twice in a similar timespan, default 4 minutes. Use cache to control the inner cache that this module uses
 * @method cache
 * @param  {String} url   The URL to cache for
 * @param  {Object} value The object to cache for that URL
 * @return {Object}       The cache for that URL
 */
function cache(url, value) {
    let expiry = Date.now() + cache.ttl;
    if (value.length === 1) value = value[0];
    if (url.slice(-1) == "?") url = url.slice(0, -1)

    cache.current[url] = { expiry, value };
    if (typeof localStorage !== "undefined") cache.current[url] = JSON.stringify({ expiry, value });

    return cache.current[url];
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
 * @return {Object}     The current cache.current
 */
cache.setTTL = function setTTL(ttl) {
    cache.ttl = ttl;
    return cache.current;
}

/**
 * Resets the cache, deletes all entries
 * @method clear
 * @return {Object} The reset cache
 */
cache.clear = function clear() {
    return cache.current = {};
}

/**
 * Tests if a specifed query is cached
 * @method cache.has
 * @param  {String} query The query, stored as the URL
 * @return {Object|null}       Either the cache if it is cached, or null if not
 */
cache.has = function has(query) {
    let cutoff = Date.now() + cache.ttl;
    if (cache.current[query] && cache.current[query].expiry < cutoff) {
        return typeof localStorage !== "undefined" ? JSON.parse(cache.current[query]) : cache.current[query];
    } else {
        // If it's expired, delete it
        delete cache.current[query];
        return null;
    }
}


module.exports = cache;