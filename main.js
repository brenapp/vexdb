const cache = require("./lib/cache");
const { request, get, getAll, size } = require("./lib/request");
const { configure, globalOptions } = require("./lib/configure");

module.exports = {
  request,
  get,
  getAll,
  size,
  configure,
  cache
}
