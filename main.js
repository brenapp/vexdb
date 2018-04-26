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
const constant = require("./lib/constants");
const { get, size } = require("./lib/request");
const live = require("./lib/live");

module.exports = {
  cache,
  constant,
  get,
  size,
  live
}
