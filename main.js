var https = require("https");

/**
 * Serializes an object into URL parameters
 * @method serialize
 * @param  {Object}  obj The object to serialize
 * @return {String}      The String of URL parameters
 */
function serialize (obj) {
  var str = ""
  for (var key in obj) {
    if (str !== "") {
      str += "&"
    }
    str += key + "=" + encodeURIComponent(obj[key])
  }

  return str
}

/**
 * Makes a reqest to the vexDB API
 * @method vexdb
 * @param  {String} endpoint The endpoint to request, must be events, teams, matches, rankings, season_rankings, awards, or skills
 * @param  {Object} params   Any URL parameters to specify, in Object form. See the relevant API docs page for more info
 * @return {Promise}
 */
function request (endpoint, params) {
  let url = `https://api.vexdb.io/v1/get_${endpoint}?${serialize(params)}`,
      output = "";
  return new Promise(function (resolve, reject) {
    https.get(url, res => {
      res.on("data", chunk => output += chunk);
      res.on("end", () => {
        let resp = JSON.parse(output);
        if(resp.status) {
          resolve(resp);
        } else {
          reject(new Error(resp.error_text));
        }
      });
    }).on("error", e => reject(e));
  });
}

/**
 * GETs an endpoint based on parameters and resolves the result
 * @method get
 * @param  {String} endpoint The endpoint to GET
 * @param  {Object} params   An object of parameters
 * @return {Promise}
 */
function get (endpoint, params) {
  return request(endpoint, params).then(res => res.result)
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
