import * as vexdb from "./src/main";

(async function () {
  const teams = await vexdb.get("events", {
    name: (name) => name.includes("Signature Event"),
  });

  teams.forEach((t) => console.log(t.name));
})();
