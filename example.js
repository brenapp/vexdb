const vexdb = require("./out/main");

function asyncMap(array, callbackfn) {
  return Promise.all(array.map(callbackfn));
}

async function asyncFilter(array, callbackfn) {
  const filterMap = await asyncMap(array, callbackfn);
  return array.filter((value, index) => filterMap[index]);
}

const STATE_SLOTS = 40;

(async function() {
  console.log("Getting Qualifying Events...");

  const events = await vexdb
    .get("events", {
      region: "South Carolina",
      season: "current"
    })
    .then(events =>
      events.filter(
        evt =>
          !evt.name.includes("Middle") &&
          (!evt.name.includes("MS") ||
            (evt.name.includes("HS") && evt.name.includes("MS")))
      )
    )
    .then(events => events.map(evt => evt.sku));

  console.log("Getting HS Awards...");

  // Get all awards won (removing Middle School)
  const awards = await vexdb
    .get("awards", { sku: events })

    // Filter out MS organizations that are for some reason listed as HS
    .then(awards =>
      awards.filter(
        award => !["6318", "8686"].includes(award.team.slice(0, -1))
      )
    )
    .then(awards =>
      awards.filter(
        award =>
          !award.name.includes("Middle School") &&
          !award.name.includes("Judges Award") &&
          !award.name.includes("Sportsmanship") &&
          !award.name.includes("Amaze") &&
          !award.name.includes("Innovate")
      )
    )
    .then(awards =>
      asyncFilter(
        awards,
        async award =>
          (await vexdb.get("teams", { team: award.team }))[0].grade ===
          "High School"
      )
    );

  const qualifies = {};

  awards.forEach(award => {
    if (qualifies[award.team]) {
      qualifies[award.team]++;
    } else {
      qualifies[award.team] = 1;
    }
  });

  console.log("Done!");
  console.log(
    `So far, ${
      Object.keys(qualifies).length
    } High School teams have qualified to state ${
      awards.length
    } times. This leaves ${STATE_SLOTS -
      Object.keys(qualifies).length} spots remaining.`
  );

  const REMAINING_AWARDS = 20;
  const HS_EVENTS = 5;

  console.log(
    `There are ${REMAINING_AWARDS} remaining awards across ${HS_EVENTS} events left which qualify for state`
  );

  const SKILLS_SPOTS =
    STATE_SLOTS - Object.keys(qualifies).length - REMAINING_AWARDS * 0.5;

  // Get skills
  const skills = await vexdb
    .get("skills", { sku: events, type: 2, season_rank: true })
    .then(skills => skills.sort((a, b) => b.score - a.score));

  console.log(skills);
})();
