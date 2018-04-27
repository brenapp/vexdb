## VexDB [![Build Status](https://travis-ci.org/MayorMonty/vexdb.svg?branch=master)](https://travis-ci.org/MayorMonty/vexdb) [![codecov](https://codecov.io/gh/MayorMonty/vexdb/branch/master/graph/badge.svg)](https://codecov.io/gh/MayorMonty/vexdb)

`vexdb` is a wrapper for [VexDB](https://vexdb.io).

## Features
 - Promise Based
 - Isomorphic: Works both in the browser and in Node.js
 - [Simple, but powerful filtering](#get)
 - [Smart cache](#caching)
 - [Live API](#live)

## Installation

Install this package with yarn:

    yarn add vexdb

or, if you want to use npm:

    npm i vexdb

## API Primer

### GET

Retrieves data from an endpoint with the specified parameters. These parameters can include any that can be specified to VexDB, as well as final values in the response object. Parameters can be Strings, RegExps, Arrays, or Functions. 

*Normally, vexdb limits responses to 5000 items per request. `vexdb` will make enough requests to ensure that all applicable matches are returned*
```javascript
// Get all events in StarStruck
var vexdb = require("vexdb");
vexdb.get("events", { season: "StarStruck" })
    .then(console.log)

// Get all teams from South Carolina and California whose team number is 4 digits and ends with a B
vexdb.get("teams", { 
    region: ["California", "South Carolina"],
    number: /^[0-9]{4}B$/g 
}).then(console.log) 

// Get all combined skills scores at Worlds and CREATE U.S. Open above 200
vexdb.get("skills", {
    sku: ["RE-VRC-17-2559", "RE-VRC-17-3805"]
    type: 2,
    score: (score, run) => score > 200
}).then(console.log)

// Get 500 random teams from the United States and China
let i = 0;
vexdb.get("teams", {
    country: ["China", "United States"],
    pick: (pick, team) => Math.random() > 0 && i < 500
})

// Get all skills runs for teams that begin their name with [TVA]
vexdb.get("skills", {
    team: async (team, run) => 
        (await vexdb.size("teams", {
            team,
            name: /$\[TVA\].+/g
        })) > 0
})
```
> **Warning**: Certain endpoints describe a team's number as `team`, while others refer to it as `number` (namely the `teams` endpoint). Only use `number` when specifying using the `teams` endpoint, and only when passing strings or an array of strings. 


### Size

This works basically identically to `.get()`, but returns the number of items that fit this result.
```javascript
// Get the number of all teams in California
vexdb.size("teams", { region: "California" })
    .then(console.log) 

// All examples from .get() above would work here...

```
> Depending on the parameters specified, `size()` may or may not send `nodata` requests. In order to minimize bandwidth, you'll want to only include parameters that can be passed directly to VexDB

### Defaults
In many cases, you'll want to share headers and parameters across requests. This can be done using `vexdb.constants.header` and `vexdb.constants.param`, respectively:
```javascript
vexdb.constants.param({
    region: ["California", "New York"]
}) 

vexdb.constants.header({
    "User-Agent": "<custom user agent string>"
})
```


### Caching
Since VexDB only updates every 4 minutes, this module will prevent repeat requests by resolving them with the previous value immediately. You can control this behavior with `vexdb.cache`

*Note: On the browser, caching will take place in `localStorage`, and in Node.js a cache file will be stored in a temporary file, which can be configured with `vexdb.constants.settings.cache.file`*

**Update the Time To Live for new caches**
```javascript
vexdb.cache.setTTL(60 * 1000);
```
**See if a cache is present, and get it**
```javascript
vexdb.cache.has("teams", {
    region: "South Carolina"
})
```
### Live
This module also supports basic live features. Specify an endpoint and parameters (passed through to `get()`) and recieve updates on new items that fit that criteria
```javascript
vexdb.live("matches", {
    scored: 1,
    sku: "RE-VRC-17-3805"
}).on("item", console.log)
```

*Note that the `item` event will trigger for every result on the inital poll. This means that every item that fits the parameters will be passed to `item`. If you do not want this to be the case, specify `prefetch: true` in your listed parameters*
```javascript
// Only new matches will trigger item
vexdb.live("matches", {
    scored: 1,
    sku: "RE-VRC-17-3805",
    prefetch: true
}).on("item", console.log)
```
### Events

`fetch`
- `newItems Object[]`

Emitted on a successful fetch

`prefetch`
- `results Object[]`

Emitted when a prefetch has been completed

`item`
- `item Object`

Emitted for each new item

`close`

Emitted for each new item

---

### API

`close(): undefined`
Stop new polls


`params(newParams: Object): Object`
Override request parameters for future requests. *Note: this does not change the current index of results*


`current(): Object[]`
Returns the current cache of results

