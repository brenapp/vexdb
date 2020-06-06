/**
 * Get
 */

import test from "ava";
import { get } from "../out/main";

test(".get() correctly resolves for simple requests", async (t) => {
  Promise.all([
    get("events", { season: "StarStruck" }).then((res) =>
      res.length > 0 ? null : t.fail()
    ),
    get("teams", { region: "South Carolina" }).then((res) =>
      res.length > 0 ? null : t.fail()
    ),
    get("matches", { sku: "RE-VRC-17-3805" }).then((res) =>
      res.length > 0 ? null : t.fail()
    ),
    get("rankings", { team: "3796B" }).then((res) =>
      res.length > 0 ? null : t.fail()
    ),
    get("season_rankings", { team: "7447B" }).then((res) =>
      res.length > 0 ? null : t.fail()
    ),
    get("skills", { team: "3796B" }).then((res) =>
      res.length > 0 ? null : t.fail()
    ),
    get("awards", { sku: "RE-VRC-17-3805" }).then((res) =>
      res.length > 0 ? null : t.fail()
    ),
  ]).then(() => t.pass());
});

// test(".get() correctly filters post-request", async (t) => {
//   let req = await get("events", {
//     region: "South Carolina",
//     loc_city: "Greenville",
//   });
//   let reference = await get("events", {
//     region: "South Carolina",
//   });

//   req.length < reference.length ? t.pass() : t.fail();
// });

test(".get() correctly resolves with parameters that are present in the query but not the response", async (t) => {
  let req = await get("matches", { team: "3796B" });

  req.length > 0 ? t.pass() : t.fail();
});
