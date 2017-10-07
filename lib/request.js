var axios = require("axios");
var cache = require("./cache");
var { configure, globalOptions } = require("./configure");

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
 * Makes a reqest to the vexDB API
 * @method request
 * @param  {String} endpoint The endpoint to request, must be events, teams, matches, rankings, season_rankings, awards, or skills
 * @param  {Object} params   Any URL parameters to specify, in Object form. See the relevant API docs page for more info
 * @return {Promise}
 */
function request(endpoint, args) {

    // Validate endpoint against known, to avoid unneeded requests
    let known = [
        "events",
        "teams",
        "matches",
        "rankings",
        "season_rankings",
        "awards",
        "skills"
    ];

    if (!known.includes(endpoint))
        return Promise.reject(
            new RangeError("Endpoint '" + endpoint + "' not known. Valid endpoints are " + known.join(", "))
        )

    let url = `/get_${endpoint}`,
        output = "";

    let res = cache.has(url);
    let params = Object.assign({}, globalOptions.defaultParams, args);
    if (res) {
        return Promise.resolve(res.value)
    } else {
        return axios.get(url, {
            headers: globalOptions.headers,
            params
        }).then(res => res.data.status ? cache(serialize(url, params), res.data).value : Promise.reject(new Error(res.data.error_text)))
    }
}

/**
 * GETs an endpoint based on parameters and resolves the result
 * @method get
 * @param  {String} endpoint The endpoint to GET
 * @param  {Object} params   An object of parameters
 * @return {Promise}
 */
function get(endpoint, params) {
    return request(endpoint, params)
        .then(res => res.result)
        .then(res => ~-res.length ? res : res[0])
        .catch(e => {
            throw e
        })
}

/**
 * VexDB limits responses to 5000 items. This acts the same as get, but will make enough request to ensure that
 * all items are returned
 * @method getAll
 * @param  {String} endpoint The endpoint to GET
 * @param  {Object} params   An object of parameters
 * @return {Promise}
 */
function getAll(endpoint, params) {
    return size(endpoint, Object.assign({}, params || {}))
        .then(
            items =>
            Promise.all(
                [...Array(Math.ceil(items / 5000))]
                .map(
                    (v, i) => get(endpoint, Object.assign(params || {}, {
                        limit_start: 5000 * i
                    }))
                )
            ).then(result => result.reduce((a, b) => a.concat(b)))
        )
}

/**
 * Gets the size of an endpoint with parameters. It performs a nodata request and resolves the number of results
 * @method size
 * @param  {String} endpoint The endpoint to get the size of
 * @param  {Object} params   Any criteria to specify on the endpoint, see relevant vexDB documentation page
 * @return {Promise}
 */
function size(endpoint, params) {
    return request(endpoint, Object.assign(params || {}, {
        nodata: true
    })).then(res => res.size)
}

module.exports = {
    request,
    get,
    getAll,
    size
}