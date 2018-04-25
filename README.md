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

[`.get()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#get)

Retrieves data from an endpoint with the specified parameters. These parameters can include any that can be specified to VexDB, as well as final values in the response object. Parameters can be Strings, RegExps, Arrays, or Functions

    var vexdb = require("vexdb");
    vexdb.get("events", { season: "StarStruck" })
      .then(console.log) // An array, of events
    
    vexdb.get("teams", { 
        region: ["California", "South Carolina"],
        number: /[0-9]{4}B/g 
    }).then(console.log) // An array of teams from California and South Carolina whose number is 4 digits and ends in B

    vexdb.get("skills", {
        sku: ["RE-VRC-17-2559", "RE-VRC-17-3805"]
        type: 2,
        score: (score, run) => score > 200
    }).then(console.log) // An array of skills from CREATE US and Worlds whose combined score is above 90

[`.size()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#size)

    vexdb.size("teams", { region: "California" })
      .then(console.log) // A Number, like 65

[`.configure()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#configure)

    vexdb.configure({
      headers: {
        "User-Agent": "VexBot"
      },
      defaultParams: {
        season: "StarStruck"
      }
    });
    // All requests will have those headers and default parameters, from now on

## Caching
Since VexDB only updates every 4 minutes, this module will prevent repeat requests by resolving them with the previous value immediately. You can control this behavior with `vexdb.cache`

### Update the Time To Live for new caches

    vexdb.cache.setTTL(60 * 1000);

### See if a cache is present, and get it

    vexdb.cache.has("/get_events?season=StarStruck")


## Documentation
See [API.md](https://github.com/MayorMonty/vexdb/blob/master/API.md)
