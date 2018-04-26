## VexDB [![Build Status](https://travis-ci.org/MayorMonty/vexdb.svg?branch=master)](https://travis-ci.org/MayorMonty/vexdb) [![codecov](https://codecov.io/gh/MayorMonty/vexdb/branch/master/graph/badge.svg)](https://codecov.io/gh/MayorMonty/vexdb)

`vexdb` is a wrapper for [VexDB](https://vexdb.io).

## Features
 - Promise-based requests
 - Isometric, works in both Node and the Browser
 - Provides powerful filtering options not easily available in normal requests
 - Makes extra requests to account for VexDB's 5000 item response limit
 - Handles caching to avoid uneeded requests

## Installation

Install this package with yarn:

    yarn add vexdb

or, if you want to use npm:

    npm i vexdb

## API Primer

### GET

Retrieves data from an endpoint with the specified parameters. These parameters can include any that can be specified to VexDB, as well as final values in the response object. Parameters can be Strings, RegExps, Arrays, or Functions. 

*Normally, vexdb limits responses to 5000 items per request. `vexdb` will make enough requests to ensure that all applicable matches are returned*

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


### Size

This works basically identically to `.get()`, but returns the number of items that fit this result.

    // Get the number of all teams in California
    vexdb.size("teams", { region: "California" })
      .then(console.log) 

### Defaults
In many cases, you'll want to share headers and parameters across requests. This can be done using `vexdb.constants.header` and `vexdb.constants.param`, respectively:

    vexdb.constants.param({
        region: ["California", "New York"]
    }) 

    vexdb.constants.header({
        "User-Agent": "<custom user agent string>"
    })



### Caching
Since VexDB only updates every 4 minutes, this module will prevent repeat requests by resolving them with the previous value immediately. You can control this behavior with `vexdb.cache`

*Note: On the browser, caching will take place in `localStorage`, and in Node.js a cache file will be stored in a temporary file, which can be configured with `vexdb.constants.settings.cache.file`*

#### Update the Time To Live for new caches

    vexdb.cache.setTTL(60 * 1000);

#### See if a cache is present, and get it

    vexdb.cache.has("teams", {
        region: "South Carolina"
    })


## Documentation
See [API.md](https://github.com/MayorMonty/vexdb/blob/master/API.md)
