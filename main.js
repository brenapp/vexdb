/**
 * 
 * vexdb - An API wrapper for VexDB (https://vexdb.io)
 * Copyright (c) 2017 Brendan McGuire. See LICENSE file for details (MIT LICENSE)
 * 
 * Features of vexdb!
 *  - Complete Cache Control
 *  - Promises
 *  - Isometric
 *  - Live Subscriptions
 */

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
