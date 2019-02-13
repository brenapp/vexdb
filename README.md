## VexDB

[![Build Status](https://travis-ci.org/MayorMonty/vexdb.svg?branch=master)](https://travis-ci.org/MayorMonty/vexdb) [![codecov](https://codecov.io/gh/MayorMonty/vexdb/branch/master/graph/badge.svg)](https://codecov.io/gh/MayorMonty/vexdb) [![npm](https://img.shields.io/npm/dm/vexdb.svg)](https://npm.im/vexdb)

`vexdb` is a wrapper for [VexDB](https://vexdb.io).

## Features

- Promise Based
- Isomorphic: Works both in the browser and in Node.js
- [Simple, but powerful filtering](#get)
- [Smart cache](#caching)
- [Live API](#live)
- Complete TypeScript Definitions (it's written in TypeScript)

## Installation

Install this package with yarn:

    yarn add vexdb

or, if you want to use npm:

    npm i vexdb

## API Primer

### GET

Retrieves data from an endpoint with the specified parameters. These parameters can include any that can be specified to VexDB, as well as final values in the response object. Parameters can be Strings, RegExps, Arrays, or Functions.

_Normally, vexdb limits responses to 5000 items per request. `vexdb` will make enough requests to ensure that all applicable matches are returned_

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



### Size

This works basically identically to `.get()`, but returns the number of items that fit this result.

```javascript
// Get the number of all teams in California
vexdb.size("teams", { region: "California" }).then(console.log);

// All examples from .get() above would work here...
```

> Depending on the parameters specified, `size()` may or may not send `nodata` requests. In order to minimize bandwidth, you'll want to only include parameters that can be passed directly to VexDB

### Defaults

In many cases, you'll want to share headers and parameters across requests. This can be done using `vexdb.constants.header` and `vexdb.constants.param`, respectively:

```javascript
vexdb.constants.param({
  region: ["California", "New York"]
});

vexdb.constants.header({
  "User-Agent": "<custom user agent string>"
});
```

> **Warning**: Because of the Cross Origin Policy, setting headers using `vexdb.constants.header` may cause the browser to automatically block requests to `https://api.vexdb.io`. It is not reccomended to use headers in the browser.

### Caching

Since VexDB only updates every 4 minutes, this module will prevent repeat requests by resolving them with the previous value immediately. You can control this behavior with `vexdb.cache`

_Note: `vexdb` uses my own [`keya`](https://npm.im/keya) module to handle cache. In Node, caching will take place in the filesystem, while in the browser, caches will be stored first in IndexedDB, then in localStorage_

**Update the Time To Live for new caches**

```javascript
vexdb.cache.setTTL(60 * 1000);
```

**See if a cache is present**

```javascript
vexdb.cache
  .has("teams", {
    region: "South Carolina"
  })
  .then(console.log); // Boolean
```

**Directly resolve a cached value**

```javascript
vexdb.cache.resolve("skills", { region: "Utah" }).then(console.log); // The resolved value, or undefined if the cache isn't present
```

**Clear the cache**

```javascript
vexdb.cache.clear().then(() => console.log("Cache has been cleared"));
```

### Live

This module also supports basic live features. Specify an endpoint and parameters (passed through to `get()`) and recieve updates on new items that fit that criteria

```javascript
vexdb
  .live("matches", {
    scored: 1,
    sku: "RE-VRC-17-3805"
  })
  .on("item", console.log);
```

_Note that the `item` event will trigger for every result on the inital poll. This means that every item that fits the parameters will be passed to `item`. If you do not want this to be the case, specify `prefetch: true` in your listed parameters_

```javascript
// Only new matches will trigger item
vexdb
  .live("matches", {
    scored: 1,
    sku: "RE-VRC-17-3805",
    prefetch: true
  })
  .on("item", console.log);
```

#### Events

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

#### API

`close(): undefined`
Stop new polls

`params(newParams: Object): Object`
Override request parameters for future requests. _Note: this does not change the current index of results_

`current(): Object[]`
Returns the current cache of results
