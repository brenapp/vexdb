import test from "ava";
import { get } from '../main';

test(".get() resolves for correct requests", async t => {
  var res = await get("events", { season: "StarStruck" });
  if (res.length > 0) { t.pass() } else { t.fail("Did not get any results") }
});

test(".get() rejects for incorrect endpoints", async t => {
  try {
    await get("invalid");
  } catch(e) {
    t.pass()
  }
});

test(".get() with post-request filters", async t => {
    await get("teams", {
      region: ["South Carolina", "North Carolina"],
      name: /\[TVA\].+/g,
      city: (city, item) => !~city.indexOf("e"),
      grade: ["High School", "Middle School"],
      number: "3796B"
    }).then(t.pass)
      .catch(t.fail)
})