import * as vexdb from "./src/main";

vexdb.get("teams", { team: ["3796C", "3796E"] }).then(console.log);
