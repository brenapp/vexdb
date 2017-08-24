# VexDB [![Build Status](https://travis-ci.org/MayorMonty/vexdb.svg?branch=master)](https://travis-ci.org/MayorMonty/vexdb) [![codecov](https://codecov.io/gh/MayorMonty/vexdb/branch/master/graph/badge.svg)](https://codecov.io/gh/MayorMonty/vexdb)
Install this package with:

    yarn add vexdb

or, if you want to use npm:

    npm i vexdb

## Examples

[`.get()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#get)

    var vexdb = require("vexdb");
    vexdb.get("events", { season: "StarStruck" })
      .then(console.log) // An array, of events

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

[`.getAll()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#getAll)

    var vexdb = require("vexdb");
    vexdb.getAll("events")
      .then(console.log) // [...5000+ events]

## Caching
Since VexDB only updates every 4 minutes, this module will prevent repeat requests by resolving them with the previous value immediately. You can control this behavior with `vexdb.cache`

### Update the Time To Live for new caches

    vexdb.cache.setTTL(60 * 1000);

### See if a cache is present, and get it

    vexdb.cache.has("/get_events?season=StarStruck")


## Documentation
See [API.md](https://github.com/MayorMonty/vexdb/blob/master/API.md)
