# VexDB

Install this package with:

    npm install vexdb

or, if you want to use yarn:

    yarn add vexdb

## Examples

[`.get()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#get)

    var vexdb = require("vexdb");
    vexdb.get("events", { season: "StarStruck" })
      .then(console.log)

[`.size()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#size)

    vexdb.size("teams", { region: "California" })
      .then(console.log)

[`.configure()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#configure)

    vexdb.configure({
      headers: {
        "User-Agent": "RoBot"
      },
      defaultParams: {
        season: "StarStruck"
      }
    });
    // All requests will have those headers and default parameters, from now on

[`.getAll()`](https://github.com/MayorMonty/vexdb/blob/master/API.md#getAll)

    var vexdb = require("vexdb");
    vexdb.getAll("events", { season: "StarStruck" })
      .then(console.log)

## API
See [API.md](https://github.com/MayorMonty/vexdb/blob/master/API.md)
