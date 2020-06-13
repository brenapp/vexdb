import * as vexdb from "./src/main";

(async function () {
  const teams = await vexdb.get("teams", { program: "VEXU" });

  const events = await Promise.all(
    teams.map((team) => vexdb.get("events", { team: team.number }))
  );

  console.log(events);
})();
