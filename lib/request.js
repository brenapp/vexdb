const axios = require("axios");
const cache = require("./cache");
const { globalOptions } = require("./configure");



/**
 * Makes a reqest to the vexDB API
 * @method request
 * @param  {String} endpoint The endpoint to request, must be events, teams, matches, rankings, season_rankings, awards, or skills
 * @param  {Object} params   Any URL parameters to specify, in Object form. See the relevant API docs page for more info
 * @return {Promise}
 */
function request(endpoint, args, doCache = true) {

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


    let params = Object.assign({}, globalOptions.defaultParams, args);
    if (cache.has(endpoint, params)) {
        return Promise.resolve(
            cache.resolve(endpoint, params)
        );
    } else {
        return axios.get(`/get_${endpoint}`, {
            headers: globalOptions.headers,
            params
        })
            .then(res => res.data.status ?
                cache(endpoint, params, res.data) :
                Promise.reject(new Error(res.data.error_text))
            );
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
    }), false).then(res => res.size)
}

module.exports = {
    request,
    get,
    getAll,
    size
}