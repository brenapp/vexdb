import * as vexdb from "./src/main";
import filter from "./src/util/filter";

async function main() {
  let teams = await vexdb.get("teams", {
    number: number => number.startsWith("8686")
  });

  let awards = await vexdb.get("awards", {
    name: "Tournament Champions (VRC/VEXU)",
    team: teams.map(a => a.number)
  });

  console.log("THE 8686 ALLIANCE");
  teams.forEach(team => {
    console.log(
      `${team.number} - ${team.team_name} (${team.city}, ${team.region})`
    );
  });

  console.log(awards.length);
}

main();
