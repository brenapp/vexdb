import * as vexdb from "./src/main";

// vexdb
//   .get("teams", {
//     team_name: "Some Assembly Required",
//   })
//   .then(console.log);

// vexdb.get("events", { season: "Nothing But Net" }).then(console.log);

vexdb.get("matches", { team: "3796B" }).then(console.log);
