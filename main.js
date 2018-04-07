/**
 * 
 * vexdb - An API wrapper for VexDB (https://vexdb.io)
 * Copyright (c) 2017 Brendan McGuire. See LICENSE file for details (MIT LICENSE)
 * 
 * Special thanks to Nathan Allen for providing an excellent service!
 * 
 * Features of vexdb:
 *  - Complete Cache Control
 *  - Useful abstractions
 *  - Promises
 *  - Isometric
 */

const cache = require("./lib/cache");
const { request, get, getAll, size } = require("./lib/request");
const { configure, globalOptions } = require("./lib/configure");
const util = require("./lib/util");

module.exports = {
  request,
  get,
  getAll,
  size,
  configure,
  cache,
  util
}
