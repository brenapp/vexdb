const axios = require("axios");
const cache = require("./cache");
const { globalOptions } = require("./configure");
const { validParams, key } = require("./util");
const { makePermutations } = require("./helper")

/**
 * vexdb.get("teams", { 
 *  team: ["60X", "52455A", "8926", "3796B"]
 * })
 * 
 * vexdb.get("events", {
 *  region: ["South Carolina", "California", "North Carolina"]
 * })
 * 
 * vexdb.get("teams", {
 *  team_name: /\[TVA\].+/g
 * })
 */


async function request(endpoint, args) {
    let params = {
        passable: {},
        perms: {},
        filters: {}
    };
    Object.keys(args).forEach(param => {
        let value = args[param];

        // Applied on the request
        if (typeof value === "string" && validParams[endpoint].includes(param))
            return params.passable[param] = value;
        if (value instanceof Array && validParams[endpoint].includes(param))
            return params.perms[param] = value;

        // Filters after the request
        if (value instanceof RegExp)
            return params.filters[param] = (val, obj) => value.test(val);
        if (value instanceof Array)
            return params.filters[param] = (val, obj) => values.includes(val);
        return params.filters[param] = (val, obj) => val == value;
    });



    // First, generate necessary requests
    let req = (await Promise.all(Object.keys(params.perms).length ?
        makePermutations(Object.values(params.perms))
            .map(path =>
                get(endpoint,
                    path
                        .map((t, i) =>
                            ({ [Object.keys(params.perms)[i]]: Object.values(params.perms)[i][t] })
                        )
                        .reduce((a, b) => ({ ...a, ...b }), params.passable)
                )
            ) :
        [get(endpoint, params.passable)]))

        // Combine results into one array
        .reduce((a, b) => a.concat(b), []);

    let keys = req.map(a => key(a));
    return req
        .filter((item, i) => keys.indexOf(keys[i]) === i) // Uniquify Array
        .filterAsync(
            async item => (await Promise.all(
                Object.keys(params.filters).map(key => params.filters[key](item[key], item))
            )).every(a => a)
        )
}


/**
 * Makes a reqest to the vexDB API
 * @method request
 * @param  {String} endpoint The endpoint to request, must be events, teams, matches, rankings, season_rankings, awards, or skills
 * @param  {Object} params   Any URL parameters to specify, in Object form. See the relevant API docs page for more info
 * @return {Promise}
 */
function requestRaw(endpoint, args) {

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
function getRaw(endpoint, params) {
    return requestRaw(endpoint, params)
        .then(res => res.result)
        .catch(e => {
            throw e
        })
}

/**
 * VexDB limits responses to 5000 items. This acts the same as get, but will make enough request to ensure that
 * all items are returned
 * @method get
 * @param  {String} endpoint The endpoint to GET
 * @param  {Object} params   An object of parameters
 * @return {Promise}
 */
function get(endpoint, params) {
    return sizeRaw(endpoint, Object.assign({}, params || {}))
        .then(
            items =>
                Promise.all(
                    [...Array(Math.ceil(items / 5000))]
                        .map(
                            (v, i) => getRaw(endpoint, Object.assign(params || {}, {
                                limit_start: 5000 * i
                            }))
                        )
                ).then(result =>
                    result.reduce((a, b) => a.concat(b), [])
                ).then(res => ~-res.length ? res : res[0])
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

function sizeRaw(endpoint, params) {
    return requestRaw(endpoint, Object.assign(params || {}, {
        nodata: true
    }), false).then(res => res.size)
}

module.exports = {
    request,
    requestRaw,
    get,
    size
}