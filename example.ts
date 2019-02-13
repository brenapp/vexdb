import * as vexdb from "./src/main";
import { AwardsResponseObject } from "./src/constants/ResponseObjects";

async function qualifications() {
  const award = await vexdb
    .get("events", { season: "current", region: "South Carolina" })
    .then(events => events.map(event => event.sku))
    .then(sku => vexdb.get("awards", { sku }));

  let teams = new Set<string>();
  let totals: { [key: string]: AwardsResponseObject[] } = {};

  await Promise.all(
    award.map(async award => {
      // Ditch MS awards
      if (award.name.includes("Middle") || award.name.includes("MS")) {
        return;
      }
      // Ditch MS programs listed as HS
      if (["8686", "6818"].includes(award.team.slice(0, -1))) {
        return;
      }

      // Ditch awards that don't qualify (not Champs, Design, Excellence)
      if (
        ["Excellence", "Design", "Tournament Champions"].every(
          a => !award.name.includes(a)
        )
      ) {
        return;
      }

      // Check for MS manually
      let team = (await vexdb.get("teams", {
        team: award.team,
        single: true
      }))[0];

      if (team.grade === "Middle School") {
        return;
      }

      if (totals[award.team]) {
        totals[award.team].push(award);
      } else {
        totals[award.team] = [award];
      }

      teams.add(award.team);
    })
  );

  return teams;
}

/**
 * Returns skills rankings
 */
async function skills(qualified: Set<string>) {
  const sku = await vexdb
    .get("events", { season: "current", region: "South Carolina" })
    .then(events => events.map(event => event.sku));

  const skills = (await vexdb.get("skills", {
    sku,
    type: 2
  })).filter(team => !qualified.has(team.team));

  return skills.sort((a, b) => b.score - a.score);
}

(async function() {
  console.log("Getting qualifications...");
  const qualed = await qualifications();

  console.log(`Done.`);
  console.log("STATE SPOTS", 40);
  console.log("QUALIFIED TEAMS", qualed.size);

  console.log("SPOTS FOR SKILLS", 40 - qualed.size);
  const spots = await skills(qualed);
  console.log(
    spots
      .slice(0, 40 - qualed.size)
      .map((spot, index) => `${index + 1}. ${spot.team} with ${spot.score}`)
      .join("\n")
  );
})();
