import test from "ava";
import constants from "../lib/constants";
import { size } from "../main";
import { version } from "../package"

test("Register a header", t => {
  constants.header({
    "Accept": "application/json"
  });  
  t.deepEqual(constants.settings.headers, { 
    "User-Agent": "vexdb (nodejs)",
    "Accept": "application/json" 
  })
})

test("Register a default parameter", async t => {
  constants.param({
    season: "Nothing But Net"
  })
  t.is(await size("events"), 1044);
});
