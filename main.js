var axios = require("axios");

/**
 * Makes a reqest to the vexDB API
 * @method vexdb
 * @param  {String} endpoint The endpoint to request, must be events, teams, matches, rankings, season_rankings, awards, or skills
 * @param  {Object} params   Any URL parameters to specify, in Object form. See the relevant API docs page for more info
 * @return {Promise}
 */
function request (endpoint, params) {

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

  let url = `https://api.vexdb.io/v1/get_${endpoint}`,
      output = "";
  console.log(`GET ${url}`)
  return axios.get(url, params)
    .then(res => res.data.status ? res.data : Promise.reject(new Error(res.data.error_text)))
}

/**
 * GETs an endpoint based on parameters and resolves the result
 * @method get
 * @param  {String} endpoint The endpoint to GET
 * @param  {Object} params   An object of parameters
 * @return {Promise}
 */
function get (endpoint, params) {
  return request(endpoint, params).then(res => res.result).catch(e => { throw e })
}

/**
 * Gets the size of an endpoint with parameters. It performs a nodata request and resolves the number of results
 * @method size
 * @param  {String} endpoint The endpoint to get the size of
 * @param  {Object} params   Any criteria to specify on the endpoint, see relevant vexDB documentation page
 * @return {Promise}
 */
function size (endpoint, params) {
  return request(endpoint, Object.assign(params || {}, { nodata: true })).then(res => res.size)
}

module.exports = {
  request,
  get,
  size
}
