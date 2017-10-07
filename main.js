const cache = require("./lib/cache");
const { request, get, getAll, size } = require("./lib/request");
const { configure, globalOptions } = require("./lib/configure");
const live = require("./lib/live");

module.exports = {
  request,
  get,
  getAll,
  size,
  configure,
  cache,
  live
}
