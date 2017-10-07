var axios = require("axios");

axios.defaults.baseURL = "https://api.vexdb.io/v1/";

var globalOptions = {
    "defaultParams": {
    
    },
    "headers": {
    
    },
    "settings": {
        "live": {
            "pollTime": 60 * 4 * 1000
        }
    }
}

/**
 * Configure requests, to add things like default parameters, User Agent, etc
 * @method configure
 * @param  {Object}  changes Any changes to the default options, outlined below
 * @param  {Object}  changes.defaultParams Specify default parameters, like always limiting to a region, or season. This are mixed with specified parameters (and specified parameters take precendence)
 * @param  {Object}  changes.headers Include any headers to include with all requests, like User-Agent
 * @param  {Object}  changes.settings Configure settings for vexdb
 * @return {Object}          The updated options object
 */
function configure(changes) {

  changes.headers = changes.headers || {};
  changes.defaultParams = changes.defaultParams || {};
  changes.settings = changes.settings || {};

  Object.assign(globalOptions.headers, changes.headers);
  Object.assign(globalOptions.defaultParams, changes.defaultParams);
  Object.assign(globalOptions.settings, changes.settings);

  return globalOptions;
}

module.exports = {
    configure,
    globalOptions   
};