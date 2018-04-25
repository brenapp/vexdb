const constants = require("./constants");
const cache = require("./cache");
require("isomorphic-fetch");

async function request(endpoint, params) {
    if (cache.has(endpoint, params)) return cache.resolve(endpoint, params);

    return fetch(cache.serialize(`${constants.settings.baseURL}/get_${endpoint}`, params), {
        headers: constants.settings.headers
    })
        .then(data => data.json())
        .then(data => data.status ?
            (cache(endpoint, params, data.result), data) :
            Promise.reject(new Error(data.error_text))
        )
}

async function filter(arr, callback) {
    return (await Promise.all(arr.map(async item => {
        return (await callback(item)) ? item : undefined
    }))).filter(i => i !== undefined)
}

/**
 * Given a base object and possible permutations, returns the array of all possible values
 * @param {Object} base The base object to work with
 * @param {Object} permutations The permutations to apply
 */
function permutationObject(base, permutations) {
    let lengths = Object.values(permutations).map(a => a.length),
        sizes = [...Array(Object.keys(permutations).length + 1)]
            .map((a, i) => lengths.slice(i).reduce((a, b) => a * b, 1));

    return [...Array(sizes[0])].map((a, i) =>
        sizes.slice(1) // Skip the first size, which is just for the structure
            .map(cost => (
                out = Math.floor(i / cost), // Given our currently available resources, which one can we access? Flooring to ensure we never pass nodes we can't
                i -= cost * out, // Lose the number of passed nodes
                out
            ))
    )
        .map(path =>
            path
                .map((t, i) =>
                    ({ [Object.keys(permutations)[i]]: Object.values(permutations)[i][t] })
                )
                .reduce((a, b) => Object.assign({}, a, b), base)
        );
}

/**
 * Performs a request to the specified endpoint, and resolves the result
 * @param {String} endpoint The endpoint to get
 * @param {Object} params Parameters, see documentation for more information
 * 
 */
async function get(endpoint, params) {
    if (!constants.endpoints.includes(endpoint)) return Promise.reject(new RangeError(`Endpoint ${endpoint} not know. Valid endpoints are ${constants.endpoints.join(", ")}`));
    params = Object.assign({}, constants.settings.params, params); // Assign defaults

    // Passed parameters fall into three categories: (1) ones we can pass directly to the request, (2) ones that need to be filtered afterwards, (3) ones that can be satisfied with extra requests
    // We need to sort these, make the extra requests, and do afterwards filtering

    let universal = {}, // Universal parameters, ones we can pass directly
        filters = {}, // Filters, (async) functions to be applied after the request
        permutations = {}; // Parameters that necesitate extra requests

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];

            // Applied on the request
            if (typeof value === "string" && validParams[endpoint].includes(param))
                universal[param] = value; break;
            if (value instanceof Array && validParams[endpoint].includes(param))
                permutations[param] = value; break;

            // Filters after the request
            if (value instanceof RegExp)
                filters[param] = (val, obj) => value.test(val); break;
            if (value instanceof Array)
                filters[param] = (val, obj) => values.includes(val); break;
            if (value instanceof Function)
                filters[param] = value; break;

            filters[param] = (val, obj) => val == value; break;

        }
    }

    let req = await Promise.all(permutationObject(universal, permutations)
        .map(p =>
            request(endpoint, p).then(data => data.result)
        )
    )

    return filter(req
        .reduce((a, b) => a.concat(b), []) // Combine into unique array
        .filter((e, i, a) => a.indexOf(JSON.stringify(e)) === i), // Uniqify
        async item =>
            (await Promise.all(
                Object.keys(filters).map(key => filters[key](item[key], item))
            ))
                .every(a => a)
    )


}

/**
 * Resolves the number items that fit the specified request (saves data)
 * @param {String} endpoint Endpoint
 * @param {Object} params Parameters, see documentation for more information
 */
async function size(endpoint, params) {

}



module.exports = {
    get,
    size,
    request,
    permutationObject
}