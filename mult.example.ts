import * as vexdb from "./src/main";

(async () => {
  let matches = await vexdb.get("matches", {
    round: [5],
    team: "3796B"
  });

  console.log(matches);
})();
