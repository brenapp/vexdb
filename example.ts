import * as vexdb from "./src/main";

vexdb
  .get("teams", {
    team_name: "Some Assembly Required",
  })
  .then(console.log);
