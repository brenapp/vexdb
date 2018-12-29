import * as vexdb from "./src/main";
import { EventsResponseObject } from "./src/constants/ResponseObjects";

vexdb.cache.clear();

(async function(stateSKU) {
  // Get teams currently registered for the State Tournament (HS)
  const state = await vexdb.get("teams", { sku: stateSKU });

  // Get all skills runs which will count towards final rankings
  let valid = await vexdb.get("skills", {
    sku: (await vexdb.get("events", {
      region: "South Carolina",
      season: "current",
      status: "past"
    })).map((event: EventsResponseObject) => event.sku),
    type: 2,
    team: team => (console.log(team), true)
  });

  console.log(valid);
})("RE-VRC-18-5973");
